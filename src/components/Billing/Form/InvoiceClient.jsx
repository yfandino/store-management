import React, { memo, useRef, useState } from 'react';
import { Grid, Card, CardHeader, CardContent, TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LoadingButton from "../../Commons/LoadingButton";
import { API_CLIENTS } from "../../../firebase/api"
import AddClient from "./AddClient";

const InvoiceClient = (props) => {

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFound, setIsFound] = useState(null);
  const clientIdRef = useRef();

  const handleClick = () => {
    setIsSearching(true);

    const clientId = clientIdRef.current.value.toUpperCase();

    if (clientId) {
      API_CLIENTS.getClient(clientId)
        .then(clientSnapshot => {
          if (!clientSnapshot.exists) setIsFound(false);
          else {
            setIsFound(true);
            props.setClientRef(clientSnapshot.ref);
          }
        })
        .catch((err) => console.log("Error getting client", err))
    }

    setIsSearching(false);
  }

  const handleOpen = () => {
    clientIdRef.current.value = "";
    setIsFound(null);
    setIsAddingNew(true);
  }

  return (
    <Card className="grid__invoice-row">
      <CardHeader
        className="card-header__invoice-body"
        title="Datos del cliente"
        titleTypographyProps={{ color: "primary", className: "card__card-header--invoice-title" }}
      />
      <CardContent>
          <Grid container spacing={2} alignItems="center">
            {isAddingNew && (
              <AddClient
                isOpen={isAddingNew}
                setIsOpen={setIsAddingNew}
                setClientRef={props.setClientRef}
                setClient={props.setClient}
              />
            )}
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                required
                type="text"
                id="id"
                label="Documento de identidad"
                name="id"
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={clientIdRef}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                type="button"
                variant="contained"
                color="primary"
                disabled={isSearching}
                isLoading={isSearching}
                onClick={handleClick}
              >
                Buscar
              </LoadingButton>
            </Grid>
            <Grid item>
              <Button
                type="button"
                variant="text"
                color="primary"
                onClick={handleOpen}
              >
                Crear Nuevo
              </Button>
            </Grid>
          </Grid>
        {props.client && (<Alert severity="success">Cliente: {Object.values(props.client).join(',').replaceAll(',', ', ')}</Alert>)}
        {isFound === false && (<Alert severity="error">Cliente con documento {clientIdRef.current.value} no encontrado</Alert>)}
      </CardContent>
    </Card>
  );
}

export default memo(InvoiceClient);