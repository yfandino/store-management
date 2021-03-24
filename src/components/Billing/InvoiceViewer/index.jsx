import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Paper, Grid, Typography, CircularProgress, Button, Divider } from '@material-ui/core';
import { PrintOutlined as PrintIcon } from '@material-ui/icons';

import { API_BILLING } from '../../../firebase/api';
import Snackbar from '../../Commons/Snackbar';
import Header from './Header';
import ClientData from './ClientData';
import ProductLines from './ProductLines';
import Totals from './Totals';
import './print.css';

const InvoiceViewer = () => {
  const location = useLocation();
  const invoiceNumber = location.pathname.split("/").pop();
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    API_BILLING.getInvoiceByQuery({
      field: "invoiceNumber",
      operator: "==",
      value: invoiceNumber
    })
    .then( querySnapshot => {
      if (querySnapshot.empty) throw new Error("Factura no encontrada");

      const invoice = querySnapshot.docs.map( doc => doc.data())[0];
      setInvoice(invoice);
    })
    .catch( err => {
      console.error("Error Get Invoice", JSON.stringify(err, null, 2))
      setError(err);
    })
    .then( () => {
      setLoading(false);
    });
  }, [invoiceNumber]);

  function handlePrint() {
    window.print();
  }

  if(loading) return <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}><CircularProgress /></div>;
  if(error || !invoice) return <Snackbar open={true} message={error.message || "Ha ocurrido un error"} type="error"/>;

  return (
    <Container style={{ width: 892.88 }}>
      <Button
        id="btn-print"
        variant="contained"
        color="primary"
        style={{ margin: "16px 0" }}
        onClick={handlePrint}
        startIcon={<PrintIcon />}
      >
          Imprimir
      </Button>
      <Grid 
        container
        component={Paper}
        direction="column"
        className="grid__-invoice-sheet"
        style={{ height: 1220.88  }}
      >
        <Header />

        <Divider style={{ margin: "16px 0"}} />

        <ClientData invoice={invoice} />

        <ProductLines lines={invoice.lines} />

        <Grid item style={{ marginTop: "auto" }}>
          <Totals totals={invoice.totals} />
          <TermsAndConditions />
        </Grid>
      </Grid>
    </Container>
  )
};

export default InvoiceViewer;

const TermsAndConditions = () => (
  <div>
    <Typography variant="h6" gutterBottom style={{ fontSize: "0.7rem", fontWeight: 600, marginTop: 24 }}>
      Términos y condiciones
    </Typography>
    <Typography style={{ fontSize: "0.7rem" }}>
      La garantía del producto se específica en el documento de garantía si aplica.
    </Typography>
    <Typography style={{ fontSize: "0.7rem" }}>
      No se realizan devoluciones de dinero. Condiciones en tienda.
    </Typography>
  </div>
  
)