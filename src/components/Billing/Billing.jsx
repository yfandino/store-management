import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Button, Grid, Divider, Typography, CircularProgress } from '@material-ui/core';

import { API_BILLING } from '../../firebase/api';
import DataTable from '../DataTable';

const Billing = () => {
  const [state, setState] = useState({ loading: true });

  useEffect( () => {
    async function getInvoices() {
      const invoices = await API_BILLING.getInvoices();
      
      setState({
        loading: false,
        rows: parseData(invoices)
      });
    }

    getInvoices();
  }, []);

  function parseData(data) {
    return data.map( e => ({
      invoiceNumber: e.invoiceNumber,
      date: new Date(e.date).toLocaleDateString(),
      client: e.client.name,
      qty: e.lines.reduce( (acc, line) => acc + line.units, 0),
      total: e.totals.total
    }));
  }

  function handleRowsChange(rows) {
    setState({ ...state, rows: parseData(rows)});
  }

  function getContent() {
    if (state.loading) {
      return (
        <div style={{ margin: 16, textAlign: "center" }}><CircularProgress /></div>
      )
    } else if (!state.rows.length) {
      return (
        <Typography align="center" style={{ marginTop: 16 }}>No hay nada que mostrar</Typography>
      )
    } else {
      return (
        <DataTable rows={state.rows} onPagination={handleRowsChange} />
      )
    }
  }

  return (
    <Container maxWidth="xl">
      <Grid container justify="flex-end" style={{ margin: '32px 0'}}>
        <Button variant="contained" color="primary" component={RouterLink} to="/billing/new">
          Nueva factura
        </Button>
      </Grid>
      <Divider />
      {getContent()}
    </Container>
  );
}

export default Billing;