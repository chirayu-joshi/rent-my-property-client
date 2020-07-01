import React, { forwardRef } from 'react';
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const authDialog = props =>
  <Dialog
    open={true}
    TransitionComponent={Transition}
    keepMounted>
    <DialogTitle>Sign In</DialogTitle>
    <DialogContent>
      <DialogContentText>
        For authenticity and security reasons, please <strong>Sign-In </strong>
        or <strong>Sign-Up</strong> before you continue to host your property.
      </DialogContentText>
    </DialogContent>
    <DialogActions style={{ margin: '10px 15px' }}>
      <Button
        color="primary"
        onClick={() => props.history.push('/')}>
        Home
      </Button>
      <Button
        color="primary"
        onClick={() => props.history.push('/signUp')}>
        Sign Up
      </Button>
      <Button
        color="primary"
        onClick={() => props.history.push('/signIn')}>
        Sign In
      </Button>
    </DialogActions>
  </Dialog>

export default authDialog;
