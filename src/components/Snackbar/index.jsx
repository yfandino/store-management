import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const CustomSnackbar = (props) => {
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      // autoHideDuration={5000}
      open={open}
      onClose={handleClose}
      transitionDuration={{ enter: 500, exit: 500 }}
      message="Esto es un mensaje"
    >
      <Alert severity={props.type} onClose={handleClose}>{props.message}</Alert>
    </Snackbar>  
  );
}

export default CustomSnackbar;