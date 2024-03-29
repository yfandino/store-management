import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

import { API_BILLING } from '../../../firebase/api';
import DataTable from '../../Commons/DataTable';
import Snackbar from '../../Commons/Snackbar';

const columns = [
  { id: 'invoiceNumber', label: 'Nº de Factura', minWidth: 100 },
  { id: 'date', label: 'Fecha', minWidth: 100 },
  { id: 'client', label: 'Client', minWidth: 170 },
  { id: 'qty', label: 'Cantidad de productos', minWidth: 80, align: 'right', format: (value) => value.toLocaleString('es-ES') },
  { id: 'total', label: 'Total (€)', minWidth: 80, align: 'right', format: (value) => value.toLocaleString('es-ES') }
];

const InvoicesTable = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [docSnapshots, setDocSnapshots] = useState(null);

  useEffect(() => {
    function getInvoices() {
      API_BILLING.getInvoices(rowsPerPage)
        .then(querySnapshot => {
          const invoices = querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() }));
          setRows(parseData(invoices));
          setDocSnapshots(querySnapshot.docs);
        })
        .then(() => setIsLoading(false))
        .catch(err => {
          console.log("Error Invoice List: getting page one", err);
          setError({ message: "Ops, ha ocurrido un error" });
        });
    }

    getInvoices();
  }, [rowsPerPage]);

  function goNextPage() {
    setIsLoading(true);

    API_BILLING.goNextPage(10, docSnapshots)
      .get()
      .then( querySnapshot => {
        const invoices = querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() }));
        setRows(parseData(invoices));
        setDocSnapshots(querySnapshot.docs);
        setIsLoading(false);
      })
  }

  function goPreviousPage() {
    setIsLoading(true);

    API_BILLING.goPreviousPage(10, docSnapshots)
      .get()
      .then( querySnapshot => {
        const invoices = querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() }));
        setRows(parseData(invoices));
        setDocSnapshots(querySnapshot.docs);
        setIsLoading(false);
      })
  }

  function parseData(data) {
    return data.map( e => ({
      invoiceNumber: e.invoiceNumber,
      date: new Date(e.date).toLocaleDateString(),
      client: e.client.name,
      qty: e.lines.reduce( (acc, line) => acc + line.units, 0),
      total: e.totals.total
    }));
  }

  if (error) return <Snackbar open={true} message={error.message} type="error" />;

  if (isLoading) return <div style={{ margin: 16, textAlign: "center" }}><CircularProgress /></div>;

  if (!rows.length) return <Typography align="center" style={{ marginTop: 16 }}>No hay nada que mostrar</Typography>;
  
  return (
    <DataTable
      columns={columns}
      rows={rows}
      page={page}
      rowsPerPage={rowsPerPage}
      setPage={setPage}
      onNextPage={goNextPage}
      onPreviousPage={goPreviousPage}
      setRowsPerPage={setRowsPerPage}
      setIsLoading={setIsLoading}
      pagination
      action
    />
  );
};

export default InvoicesTable;
