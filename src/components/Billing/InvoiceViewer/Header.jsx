import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const InvoiceViewer = () => {
  return (
    <Grid item container justify="space-between">
      <Grid item>
        <Typography style={{ fontWeight: 600 }}>María Auxiliadora Carballo</Typography>
        <Typography>NIF 35678733Y</Typography>
        <Typography>Calle López de Hoyos, 127</Typography>
        <Typography>Local 1, 28002, Madrid</Typography>
        <Typography>+34 633 606 779</Typography>
        <Typography>info@aryaly.com</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3">Factura</Typography>
      </Grid>
    </Grid>
  )
};

export default InvoiceViewer;