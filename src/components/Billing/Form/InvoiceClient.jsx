import React from 'react';
import { Paper, Grid, TextField } from '@material-ui/core';

const inputs = [
  { id: "name", label: "Nombre y Apellidos", type: "text"},
  { id: "id", label: "Nº de documento", type: "text"},
  { id: "address", label: "Dirección", type: "text"},
  { id: "phone", label: "Teléfono", type: "tel"},
]

const InvoiceClient = () => {
  return (
    <Grid item container component={Paper} >
      <Grid item container alignItems="center" wrap="nowrap" spacing={2}>
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
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default InvoiceClient;