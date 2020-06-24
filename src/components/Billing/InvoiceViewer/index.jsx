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
      const invoice = querySnapshot.docs.map( doc => doc.data());
      if (querySnapshot.empty) throw new Error("Factura no encontrada")
        
      if (invoice.length === 1) {
        setInvoice(invoice[0]);
      }
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

  if(loading) return <CircularProgress />;
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
    <Typography variant="h6" gutterBottom style={{ fontSize: "0.7rem", fontWeight: 600, marginTop: 24 }}>Términos y condiciones</Typography>
    <Typography style={{ fontSize: "0.7rem" }}>El cliente dispone de 2 años de garantía (Primer año por parte de iRiparo López de Hoyos, segundo año directamente con el fabricante).</Typography>
    <Typography style={{ fontSize: "0.7rem" }}>No se realizan devoluciones de dinero. Condiciones en tienda.</Typography>
  </div>
  
)