import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

const cards = [
  { id: "taxable", title: "Total Imponible", symbol: "€"},
  { id: "discount", title: "Descuento", symbol: "%"},
  { id: "totalTax", title: "Total IVA", symbol: "€"},
  { id: "totalWidthDiscount", title: "Total con descuento", symbol: "€"},
  { id: "shipment", title: "Envío", symbol: "€"},
  { id: "total", title: "Total a pagar", symbol: "€"}
]

const InvoiceTotals = (props) => {
  return (
    <Grid item container wrap="nowrap" spacing={2}>
      {cards.map( card => (
        <Grid item xs={3} key={card.id}>
          <Card>
            <CardContent>
              <Typography color="primary">{card.title}</Typography>
              <Typography variant="h4" style={{ padding: "8px 0" }} >
                {props[card.id] ? `${props[card.id]}${card.symbol}` : "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default InvoiceTotals;