import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
         Link, IconButton } from '@material-ui/core';
import { VisibilityOutlined as ViewIcon } from '@material-ui/icons';

const DataTable = (props) => {
  // TO-DO Actions need to be generic, now is only for view invoices
  const { columns, rows, page, rowsPerPage, setPage, setRowsPerPage, setIsLoading, pagination,
    noElevation, action, onNextPage, onPreviousPage } = props;

  const handleChangePage = (event, newPage) => {
    if (page < newPage) onNextPage();
    else onPreviousPage();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setIsLoading(true);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <Paper elevation={noElevation ? 0 : 1}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {action && (
                <TableCell
                  align="center"
                  style={{ minWidth: 50 }}
                />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  {action && (
                    <TableCell align="center">
                      <Link component={RouterLink} to={`/billing/${row.invoiceNumber}`}>
                        <IconButton size="small">
                          <ViewIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={-1}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default DataTable;
