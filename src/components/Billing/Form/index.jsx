import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

import InvoiceTotals from './InvoiceTotals';
import InvoiceClient from './InvoiceClient';
import InvoiceLine from './InvoiceLine';

const defaultLineValues = {
  description: "",
  units: 1,
  unitPrice: "",
  discount: "",
  tax: 21,
  lineTotalPriceWithTax: ""
}

const Form = () => {
  const [client, setClients] = useState({});
  const [lines, setLines] = useState([defaultLineValues]);
  const [totals, setTotals] = useState({});

  useEffect(function updateInvoice() {
    let updatedTotals = {
      taxable: 0,
      totalTax: 0,
      totalWidthDiscount: 0,
      shipment: 0,
      total: 0
    }
    let totalProducts = 0;
    lines.reduce( (acc, current) => {
      totalProducts += (current.unitPrice * current.units);
      acc.taxable += current.tax === 21 ? (current.unitPrice * current.units) : 0;
      acc.totalTax = acc.taxable * 0.21;
      acc.totalWidthDiscount = current.discount ? totalProducts * (current.discount / 100) : 0;
      acc.total = totalProducts + acc.totalTax - acc.totalWidthDiscount;
      return acc;
    }, updatedTotals);

    setTotals(updatedTotals);
  }, [lines]);

  const handleLineChange = (index, data) => {
    let updatedLines = lines.map( (line, i) => index === i ? data : line);
    setLines(updatedLines);
  }
  
  const handleAddNewLine = () => {
    setLines(lines.concat(defaultLineValues));  
  }

  const handleDeleteLine = (index) => {
    setLines(lines.filter( (_, i) => index !== i));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoice = {
      client,
      lines
    }

    console.log(invoice);
  }

  return (
    <Grid container direction="column" component="form" spacing={2} style={{ marginTop: 24 }}>

      <InvoiceTotals onChange={setTotals} {...totals} />

      <Grid item container alignItems="center" justify="space-between" style={{ margin: "8px 0" }}>
        <Typography color="primary" style={{ textTransform: "uppercase", fontWeight: 700 }}>
          Datos del cliente
        </Typography>
        <FlexButton type="submit" color="primary" variant="contained" >Crear</FlexButton>
      </Grid>

      <InvoiceClient onChange={setClients}/>
      
      <Grid item container alignItems="center" justify="space-between" style={{ margin: "32px 0 8px 0" }}>
        <Typography color="primary" style={{ textTransform: "uppercase", fontWeight: 700 }}>
          Productos
        </Typography>
        <FlexButton onClick={handleAddNewLine} color="primary" variant="outlined" >Añadir nueva línea</FlexButton>
      </Grid>
      
      {lines.map( ( lineData, i) => (
        <InvoiceLine
          key={i}
          lineIndex={i}
          data={lineData}
          onChange={handleLineChange}
          onDelete={handleDeleteLine}
        />
      ))}
    </Grid>
  );
}

export default Form;

const FlexButton = (props) => {
  return (
    <Grid item>
      <Button {...props}>{props.children}</Button>
    </Grid>
  );
}