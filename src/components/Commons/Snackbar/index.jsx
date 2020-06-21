import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const CustomSnackbar = (props) => {
  const { type, message, onClose } = props;
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={open}
      onClose={onClose || handleClose}
      transitionDuration={{ enter: 500, exit: 500 }}
    >
      <Alert severity={type} onClose={onClose || handleClose}>{message}</Alert>
    </Snackbar>  
  );
}

export default CustomSnackbar;