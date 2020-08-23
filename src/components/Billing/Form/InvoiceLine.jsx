import React, { memo, useState, useEffect } from 'react';
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const inputs = [
  { id: "description", label: "Descripción", type: "text"},
  { id: "units", label: "Unidades", type: "number"},
  { id: "unitPrice", label: "Precio unitario", type: "number", endAdornment: "€"},
  { id: "discount", label: "Descuento", type: "number", endAdornment: "%"},
  { id: "tax", label: "IVA", type: "number", endAdornment: "%"},
  { id: "total", label: "Precio", type: "number", endAdornment: "€", readOnly: true}
];

const InvoiceLine = (props) => {
  const { lineIndex, onChange, onDelete } = props;
  const [data, setData] = useState(props.lineData);

  useEffect(() => {
    onChange(lineIndex, data);
  }, [lineIndex, data]);

  const handleInputChange = (e) => {
    let { name, value } = e.currentTarget;
    const line = calculateTotal({ ...data, [name]: value });
    setData(line);
  }

  function calculateTotal(line) {
    let { units, unitPrice, discount, tax } = line;
    if(!units || !unitPrice) {
      delete line.total;
      return line
    };

    unitPrice = parseFloat(unitPrice.replace(',','.'));
    
    let totalUnitsPrice = units * unitPrice;
    let totalDiscount = totalUnitsPrice * ((discount / 100) || 0);
    let totalTax = (totalUnitsPrice - totalDiscount) * (tax === 21 ? 0.21 : 0);
    let total = (totalUnitsPrice + totalTax - totalDiscount).toFixed(2);
    return { ...line, total };
  }

  const handleDelete = (e) => {
    onDelete(lineIndex);
  }
  
  return (
    <Grid container alignItems="center" spacing={2}>
      {inputs.map( (input, index) => (
        <Grid item md={index === 0 ? 4 : true} lg={index === 0 ? 6 : true} key={input.id}>
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
            value={data[input.id] || ""}
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