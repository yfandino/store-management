import React from 'react';

import DataTable from '../../DataTable';

const columns = [
  { id: 'description', label: 'Descripción', minWidth: 100 },
  { id: 'units', label: 'Unidades', minWidth: 100 },
  { id: 'unitPrice', label: 'Precio unitario', minWidth: 170 },
  { id: 'discount', label: 'Descuento', minWidth: 80, align: 'right' },
  { id: 'tax', label: 'IVA', minWidth: 80, align: 'right' },
  { id: 'lineTotalPriceWithTax', label: 'Total', minWidth: 80, align: 'right', format: (value) => value.toLocaleString('es-ES') },
];

const ProductLines = (props) => {
  const { lines } = props;

  return (
    <DataTable 
      columns={columns}
      rows={lines}
    />
  )
}

export default ProductLines;