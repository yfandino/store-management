import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Button, Grid, Divider } from '@material-ui/core';

import DataTable from '../DataTable';

function createData(id, date, client, qty, total) {
  return { id, date, client, qty, total };
}

const rows = [
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29),
  createData('FI2020-1', '01/02/2020', "Yanniel Fandiño García", 5, 175.29)
];

const Billing = () => {
  return (
    <Container maxWidth="xl">
      <Grid container justify="flex-end" style={{ margin: '32px 0'}}>
        <Button variant="contained" color="primary" component={RouterLink} to="/billing/new">
          Nueva factura
        </Button>
      </Grid>
      <Divider />
      <DataTable rows={rows} />
    </Container>
  );
}

export default Billing;