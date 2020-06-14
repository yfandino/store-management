import React, { useEffect } from 'react';
import { Paper, Grid, IconButton, TextField, InputAdornment } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const inputs = [
  { id: "description", label: "Descripción", type: "text"},
  { id: "units", label: "Unidades", type: "number", endAdornment: "€"},
  { id: "unitPrice", label: "Precio unitario", type: "number", endAdornment: "€"},
  { id: "discount", label: "Descuento", type: "number", endAdornment: "%"},
  { id: "tax", label: "IVA", type: "number", endAdornment: "%"},
  { id: "lineTotalPriceWithTax", label: "Precio", type: "number", endAdornment: "€", readOnly: true}
]

const InvoiceLine = (props) => {
  let { data, lineIndex, onChange, onDelete } = props;
  let { units, unitPrice, discount, tax } = data;

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    data = { ...data, [name]: value };
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

    data.lineTotalPriceWithTax = lineTotalPriceWithTax;
    onChange(lineIndex, data);
  }, [units, unitPrice, discount, tax]);
  
  return (
    <Grid item container component={Paper} wrap="nowrap" alignItems="center" style={{ marginBottom: 16 }}>
      <Grid item container spacing={2}>
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
              value={data[input.id]}
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
      </Grid>
      <Grid item style={{ paddingLeft: 8 }}>
        <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
      </Grid>
    </Grid>
  );
}

export default InvoiceLine;