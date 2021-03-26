import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const InvoiceViewer = (props) => {
  const { client, invoiceNumber, date } = props.invoice;
  return (
    <Grid item container justify="space-between">
      <Grid item>
        <Typography style={{ textTransform: "uppercase", fontWeight: 600}}>
          Datos del cliente
        </Typography>
        <Typography>{client.name}</Typography>
        <Typography>{client.id}</Typography>
        <Typography>{client.address}</Typography>
        {client.phone && (<Typography>{client.phone}</Typography>)}
        {client.email && (<Typography>{client.email}</Typography>)}
      </Grid>
      <Grid item>
        <Typography>
          <span style={{ textTransform: "uppercase", fontWeight: 600}}>Nº de Factura: </span>
          <span>{invoiceNumber}</span>
        </Typography>
        <Typography align="right">
          <span style={{ textTransform: "uppercase", fontWeight: 600}}>Fecha: </span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </Typography>
      </Grid>
    </Grid>
  )
};

export default InvoiceViewer;