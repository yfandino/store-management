import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Paper, CircularProgress, Container, Button, Divider, Grid } from '@material-ui/core';

import { API_BILLING } from '../../../firebase/api';
import Header from './Header';
import ClientData from './ClientData';
import ProductLines from './ProductLines';
import Totals from './Totals';
import './print.css';

const InvoiceViewer = () => {
  const location = useLocation();
  const invoiceNumber = location.pathname.split("/").pop();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    API_BILLING.getInvoiceByQuery({
      field: "invoiceNumber",
      operator: "==",
      value: invoiceNumber
    })
    .then( querySnapshot => {
      const invoice = querySnapshot.docs.map( doc => doc.data());
      if (invoice.length === 1) {
        setInvoice(invoice[0]);
      }
    })
    .catch();
  }, [invoiceNumber]);

  function handlePrint() {
    window.print();
  }

  if(!invoice) return <CircularProgress />;

  return (
    <Container>
      <Button id="btn-print" onClick={handlePrint}>Imprimir</Button>
      <Grid 
        container
        component={Paper}
        direction="column"
        style={{ padding: 32, marginTop: 16, height: 1120.88 }}
      >
        <Header />

        <Divider style={{ margin: "16px 0"}} />

        <ClientData invoice={invoice} />

        <ProductLines lines={invoice.lines} />

        <Grid item style={{ marginTop: "auto" }}>
          <Totals totals={invoice.totals} />
        </Grid>
      </Grid>
    </Container>
  )
};

export default InvoiceViewer;