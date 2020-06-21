import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

const LoadingButton = (props) => {
  const { children, isLoading } = props;
  const buttonProps = { ...props };

  delete buttonProps.isLoading;
  
  return (
    <div style={{ position: "relative" }}>
      <Button {...buttonProps} >{children}</Button>
      {isLoading && <CircularProgress size={24} style={{ position: "absolute", left: "50%", top: "50%", margin: "-12px 0 0 -12px" }}/>}
    </div>
  );
}

export default LoadingButton;