import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import InvoiceTotals from './InvoiceTotals';
import InvoiceClient from './InvoiceClient';
import InvoiceLines from './InvoiceLines';

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

  // useEffect(function updateInvoice() {
  //   let updatedTotals = {
  //     taxable: 0,
  //     totalTax: 0,
  //     totalWidthDiscount: 0,
  //     shipment: 0,
  //     total: 0
  //   }
  //   let totalProducts = 0;
  //   lines.reduce( (acc, current) => {
  //     totalProducts += (current.unitPrice * current.units);
  //     acc.taxable += current.tax === 21 ? (current.unitPrice * current.units) : 0;
  //     acc.totalTax = acc.taxable * 0.21;
  //     acc.totalWidthDiscount = current.discount ? totalProducts * (current.discount / 100) : 0;
  //     acc.total = totalProducts + acc.totalTax - acc.totalWidthDiscount;
  //     return acc;
  //   }, updatedTotals);

  //   setTotals(updatedTotals);
  // }, [lines]);

  const handleLineChange = (index, data) => {
    let updatedLines = lines.map( (line, i) => index === i ? data : line);
    setLines(updatedLines);
  }
  
  const handleAddLine = () => {
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
    <Grid container direction="column" component="form" spacing={2} style={{ marginTop: 16 }}>
      <Grid item container wrap="nowrap" spacing={3}>
        <InvoiceTotals onChange={setTotals} {...totals} />
      </Grid>
      
      <Grid item>
        <InvoiceClient onChange={setClients}/>
      </Grid>
      
      <Grid item container direction="column">
        <InvoiceLines
          lines={lines}
          onAdd={handleAddLine}
          onChange={handleLineChange}
          onDelete={handleDeleteLine}
        />
      </Grid>
      
    </Grid>
  );
}

export default Form;