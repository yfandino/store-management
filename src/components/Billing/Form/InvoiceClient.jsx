import React from 'react';
import { Grid, Card, CardHeader, CardContent, TextField } from '@material-ui/core';

const inputs = [
  { id: "name", label: "Nombre y Apellidos", type: "text"},
  { id: "id", label: "Documento de identidad", type: "text"},
  { id: "address", label: "Dirección", type: "text"},
  { id: "phone", label: "Teléfono", type: "tel"},
]

const InvoiceClient = (props) => {

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    props.onChange( prevState => ({ ...prevState, [name]: value }));
  }

  return (
    <Card className="grid__invoice-row">
      <CardHeader
        className="card-header__invoice-body"
        title="Datos del cliente"
        titleTypographyProps={{ color: "primary", className: "card__card-header--invoice-title" }}
      />
      <CardContent>
        <Grid container spacing={2}>
          {inputs.map( (input, index) => (
            <Grid item xs={index % 2 === 0 ? 4 : true} key={input.id}>
              <TextField
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                required
                type={input.type}
                id={input.id}
                label={input.label}
                name={input.id}
                autoFocus={index === 0}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputChange}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default InvoiceClient;