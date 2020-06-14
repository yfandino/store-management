import React, { useEffect } from 'react';
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const inputs = [
  { id: "description", label: "Descripción", type: "text"},
  { id: "units", label: "Unidades", type: "number", endAdornment: "€"},
  { id: "unitPrice", label: "Precio unitario", type: "number", endAdornment: "€"},
  { id: "discount", label: "Descuento", type: "number", endAdornment: "%"},
  { id: "tax", label: "IVA", type: "number", endAdornment: "%"},
  { id: "lineTotalPriceWithTax", label: "Precio", type: "number", endAdornment: "€", readOnly: true}
]

const InvoiceLine = (props) => {
  let { lineData, lineIndex, onChange, onDelete } = props;
  let { units, unitPrice, discount, tax } = lineData;

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    let data = { ...lineData, [name]: value };
    onChange(lineIndex, data);
  }

  const handleDelete = (e) => {
    onDelete(lineIndex);
  }

  useEffect(function calculateLineTotal() {
    if(!units || !unitPrice) return;
    
    let totalUnitsPrice = units * unitPrice;
    let lineTotalWithDiscount = totalUnitsPrice - (totalUnitsPrice * ((discount/100) || 0));
    let lineTotalPriceWithTax = lineTotalWithDiscount + (lineTotalWithDiscount * (tax/100));

    lineData.lineTotalPriceWithTax = lineTotalPriceWithTax;
    onChange(lineIndex, lineData);
  }, [units, unitPrice, discount, tax]);

  return (
    <Grid container alignItems="center" spacing={2}>
      {inputs.map( (input, index) => (
        <Grid item xs={index === 0 ? 6 : true} key={input.id}>
          <TextField
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
            required
            type={input.type}
            id={input.id}
            label={input.label}
            name={input.id}
            onChange={handleInputChange}
            value={lineData[input.id]}
            InputProps={{
              readOnly: input.readOnly,
              endAdornment: input.endAdornment ? <InputAdornment position="end">{input.endAdornment}</InputAdornment> : null
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      ))}
      <Grid item>
        <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
      </Grid>
    </Grid>
  );
}

export default InvoiceLine;