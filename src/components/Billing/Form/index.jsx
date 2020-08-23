import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { API_BILLING } from '../../../firebase/api';
import InvoiceTotals from './InvoiceTotals';
import InvoiceClient from './InvoiceClient';
import InvoiceLines from './InvoiceLines';
import Snackbar from '../../Commons/Snackbar';
import LoadingButton from '../../Commons/LoadingButton';

const defaultLineValues = {
  units: 1,
  tax: 21
};

const Form = () => {
  const [client, setClient] = useState({});
  const [lines, setLines] = useState([{ ...defaultLineValues, id: Date.now() }]);
  const [totals, setTotals] = useState({});
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
      if (!current.units || !current.unitPrice) return acc;
      totalProducts += current.unitPrice * current.units;
      totalProducts =  Math.round((totalProducts + Number.EPSILON) * 100) / 100;
      acc.taxable += current.tax === 21 ? (current.unitPrice * current.units) : 0;
      acc.taxable =  Math.round((acc.taxable + Number.EPSILON) * 100) / 100;
      acc.totalWidthDiscount += current.discount 
        ? current.units * current.unitPrice * (current.discount / 100) 
        : 0;
      acc.totalWidthDiscount =  Math.round((acc.totalWidthDiscount + Number.EPSILON) * 100) / 100;
      acc.totalTax += current.tax === 21
        ? current.discount
          ? (current.units * current.unitPrice - (current.units * current.unitPrice * current.discount / 100)) * 0.21
          : current.units * current.unitPrice * 0.21
        : 0;
      acc.totalTax =  Math.round((acc.totalTax + Number.EPSILON) * 100) / 100;
      acc.total = totalProducts - acc.totalWidthDiscount + acc.totalTax;
      acc.total = Math.round((acc.total + Number.EPSILON) * 100) / 100;
      return acc;
    }, updatedTotals);

    setTotals(updatedTotals);
  }, [lines]);

  const onLineChange = useCallback((index, data) => {
    setLines(lines => lines.map((line, i) => index !== i ? line : data));
  }, []);
  
  const onAddLine = () => {
    setLines(lines.concat([{ ...defaultLineValues, id: Date.now() }]));
  };

  const onDeleteLine = useCallback(index => {
    setLines(lines => lines.filter( (_, i) => index !== i));
  }, []);

  const handleSnackbarClose = () => {
    setError(null);
  }

  function validateForm (invoice) {
    const { client, lines, totals } = invoice;
    if (!client || !client.name || !client.phone || !client.address) {
      return { message: "Debe completar todos los datos del cliente" };
    }

    if (!lines || !validateLines(lines)) {
      return { message: "Debe completar correctamente las líneas de productos" };
    }

    if (!totals || !totals.total) {
      return { message: "Error al rellenar la factura" };
    }
  }

  function validateLines(lines) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      debugger
      if (!line.description || line.unitPrice == null || line.unitPrice < 0 || ![0, 21].includes(parseInt(line.tax))) {
        return false;
      }
    }

    return true
  }

  const onSave = (e) => {
    e.preventDefault();
    setIsSaving(true)
    alert("Not implemented yet");
    const invoice = {
      client,
      lines
    }
    setIsSaving(false)
    console.log(invoice);
  }

  const onCreate = (e) => {
    e.preventDefault();
    setIsCreating(true)

    const newInvoice = {
      client,
      lines,
      totals
    }
    
    const error = validateForm(newInvoice);
    if (error) {
      setIsCreating(false)
      setError(error);
      return;
    }

    API_BILLING.addInvoice(newInvoice)
      .then( resultInvoice => {
        history.push(`/billing/${resultInvoice.invoiceNumber}`);
      })
      .catch( err => {
        console.log("Error Add Invoice", err);
        setError({ message: "Ops, ha ocurrido un error al intentar crear la factura" });
        setIsCreating(false);
      });
  }
  
  return (
    <>
      {error && (<Snackbar open={!!error} message={error.message} type="error" onClose={handleSnackbarClose} />)}
      <Grid container direction="column" component="form" spacing={2} style={{ marginTop: 16 }}>
        <Grid item container spacing={2} justify="flex-end">
          <Grid item>
            <LoadingButton
              type="submit"
              variant="outlined"
              color="primary"
              disabled={isCreating || isSaving}
              isLoading={isSaving}
              onClick={onSave}
            >
              Guardar
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={isCreating || isSaving}
              isLoading={isCreating}
              onClick={onCreate}>
              Crear
            </LoadingButton>
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