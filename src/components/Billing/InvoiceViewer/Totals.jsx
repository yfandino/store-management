import React from 'react';

import DataTable from '../../Commons/DataTable';

const columns = [
  { id: 'taxable', label: 'Imponible (€)', minWidth: 80, align: 'right', format: (value) => value.toLocaleString('es-ES') },
  { id: 'totalTax', label: 'Total IVA (€)', minWidth: 80, align: 'right', format: (value) => value.toLocaleString('es-ES') },
  { id: 'totalWidthDiscount', label: 'Total Descuento (€)', minWidth: 80, align: 'right', format: (value) => value.toLocaleString('es-ES') },
  { id: 'shipment', label: 'Envío (€)', minWidth: 80, align: 'right', format: (value) => value.toLocaleString('es-ES') },
  { id: 'total', label: 'Total (€)', minWidth: 80, align: 'right', format: (value) => value.toLocaleString('es-ES') }
];

const Totals = (props) => {
  const { totals } = props;

  return (
    <DataTable
      columns={columns}
      rows={[totals]}
    />
  )
};

export default Totals;