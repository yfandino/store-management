import React, { memo } from 'react';
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const inputs = [
  { id: "description", label: "Descripción", type: "text"},
  { id: "units", label: "Unidades", type: "number", endAdornment: "€"},
  { id: "unitPrice", label: "Precio unitario", type: "number", endAdornment: "€"},
  { id: "discount", label: "Descuento", type: "number", endAdornment: "%"},
  { id: "tax", label: "IVA", type: "number", endAdornment: "%"},
  { id: "lineTotalPriceWithTax", label: "Precio", type: "number", endAdornment: "€", readOnly: true}
];

const InvoiceLine = (props) => {
  let { lineData, lineIndex, onChange, onDelete } = props;

  const handleInputChange = (e) => {
    let { name, value, type } = e.currentTarget;

    if (type === "number") value = parseFloat(value);

    const line = { ...lineData, [name]: value };
    onChange(lineIndex, line);
  }

  const handleDelete = (e) => {
    onDelete(lineIndex);
  }
  
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
            value={input.type === "number" ? lineData[input.id] : lineData[input.id] || ""}
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

export default memo(InvoiceLine);