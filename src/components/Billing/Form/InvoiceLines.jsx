import React from 'react';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import InvoiceLine from './InvoiceLine';

const InvoiceLines = (props) => {
  let { lines, onAdd, onChange, onDelete } = props;
  return (
    <Card className="grid__invoice-row">
      <CardHeader
        className="card-header__invoice-body"
        action={
          <Button variant="outlined" color="primary" onClick={onAdd} endIcon={<AddIcon />}>Añadir</Button>
        }
        title="Productos" 
        titleTypographyProps={{ color: "primary", className: "card__card-header--invoice-title" }}
      />
      <div className="card__invoice-line-content">
        <CardContent>
          {lines.map( (line, index) => (
            <InvoiceLine
              key={line.id}
              lineData={line}
              lineIndex={index}
              onChange={onChange}
              onDelete={onDelete}
            />
          ))}
        </CardContent>
      </div>
    </Card>
  );
}

export default InvoiceLines;