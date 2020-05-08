import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Home, ExitToApp } from '@material-ui/icons';

const appBar = props => (
  <AppBar position="fixed" color="secondary">
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => props.parentProps.history.push('/')}>
        <Home />
      </IconButton>
      <Typography
        variant="h6"
        spacing={5}>
        {props.children}
      </Typography>
      <Typography
        variant="h6"
        style={{ marginLeft: 'auto' }}>
        Exit
      </Typography>
      <IconButton
        color="inherit"
        onClick={() => props.parentProps.history.push('/host')}>
        <ExitToApp />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default appBar;
