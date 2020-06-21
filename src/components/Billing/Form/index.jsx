import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';

import { API_BILLING } from '../../../firebase/api';
import InvoiceTotals from './InvoiceTotals';
import InvoiceClient from './InvoiceClient';
import InvoiceLines from './InvoiceLines';
import Snackbar from '../../Snackbar';

const defaultLineValues = {
  units: 1,
  tax: 21,
};

const Form = () => {
  const [client, setClient] = useState({});
  const [lines, setLines] = useState([defaultLineValues]);
  const [totals, setTotals] = useState({});
  const [error, setError] = useState(null);
  const history = useHistory();

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
      totalProducts += current.unitPrice ? (current.unitPrice * current.units) : 0;
      acc.taxable += current.tax === 21
        ? current.unitPrice && current.units ? (current.unitPrice * current.units) : 0
        : 0;
      acc.totalTax = acc.taxable * 0.21;
      acc.totalWidthDiscount = current.discount 
        ? acc.totalWidthDiscount + current.unitPrice * (current.discount / 100) 
        : acc.totalWidthDiscount || 0;
      acc.total = totalProducts + acc.totalTax - acc.totalWidthDiscount;
      return acc;
    }, updatedTotals);

    setTotals(updatedTotals);
  }, [lines]);

  const onLineChange = (index, data) => {
    let updatedLines = lines.map( (line, i) => {
      if (index !== i) return line;
      return calculateLineTotal(data);
    });
    setLines(updatedLines);
  };

  function calculateLineTotal(lineData) {
    if(!lineData.units || !lineData.unitPrice) return lineData;
    let totalUnitsPrice = lineData.units * lineData.unitPrice;
    let lineTotalWithDiscount = totalUnitsPrice - (totalUnitsPrice * ((lineData.discount/100) || 0));
    let lineTotalPriceWithTax = lineTotalWithDiscount + (lineTotalWithDiscount * (lineData.tax/100));
    return { ...lineData, lineTotalPriceWithTax };
  }
  
  const onAddLine = () => {
    setLines(lines.concat([defaultLineValues]));
  };

  const onDeleteLine = index => {
    setLines(lines.filter( (_, i) => index !== i));
  };

  const onSave = (e) => {
    e.preventDefault();
    const invoice = {
      client,
      lines
    }

    console.log(invoice);
  }

  const onCreate = (e) => {
    e.preventDefault();

    const newInvoice = {
      client,
      lines,
      totals
    }

    API_BILLING.addInvoice(newInvoice)
      .then( resultInvoice => {
        history.push(`/billing/${resultInvoice.invoiceNumber}`);
      })
      .catch( err => {
        console.log("Error Add Invoice", err);
        setError({ message: "Ops, ha ocurrido un error al intentar crear la factura" });
      });
  }

  return (
    <>
      {error && (<Snackbar open={true} message={error.message} type="error" />)}
      <Grid container direction="column" component="form" spacing={2} style={{ marginTop: 16 }}>
        <Grid item container spacing={2} justify="flex-end">
          <Grid item>
            <Button type="submit" variant="outlined" color="primary" onClick={onSave}>Guardar</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={onCreate}>Crear</Button>
          </Grid>
        </Grid>
        
        <Grid item container wrap="nowrap" spacing={3}>
          <InvoiceTotals onChange={setTotals} {...totals} />
        </Grid>
        
        <Grid item>
          <InvoiceClient onChange={setClient}/>
        </Grid>
        
        <Grid item container direction="column">
          <InvoiceLines
            lines={lines}
            onAdd={onAddLine}
            onChange={onLineChange}
            onDelete={onDeleteLine}
          />
        </Grid>
        
      </Grid>
    </>
  );
}

export default Form;