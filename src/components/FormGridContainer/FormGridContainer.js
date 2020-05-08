import React from 'react';
import { Grid } from '@material-ui/core';

const formGridContainer = props =>
  <Grid
    container
    direction="row"
    justify="center"
    alignItems="stretch"
    spacing={3}
    style={{width: '100%'}}>
    {props.children}
  </Grid>

export default formGridContainer;
