import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Button, Grid, Divider } from '@material-ui/core';

import InvoicesTable from './InvoiceTable';

const Billing = () => {
  return (
    <Container maxWidth="xl">
      <Grid container justify="flex-end" style={{ margin: '32px 0'}}>
        <Button variant="contained" color="primary" component={RouterLink} to="/billing/new">
          Nueva factura
        </Button>
      </Grid>
      <Divider />
      <InvoicesTable />
    </Container>
  );
}

export default Billing;