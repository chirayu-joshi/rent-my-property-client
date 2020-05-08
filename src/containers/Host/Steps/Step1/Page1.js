import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText, 
  TextField, 
  Grid } from '@material-ui/core';

import styles from '../Steps.module.css';

const page1 = props => (
  <div className={styles.page}>
    <h1>What kind of property are you listing?</h1>

    <Grid container>
      <Grid item xs={12} sm={9} xl={7}>
        <FormControl required className={styles.formElement}>
          <InputLabel>Property type</InputLabel>
          <Select name="propertyType" onChange={props.change}>
            <MenuItem><em>None</em></MenuItem>
            <MenuItem value="house">House</MenuItem>
            <MenuItem value="flat">Flat</MenuItem>
            <MenuItem value="hotel">Hotel</MenuItem>
            <MenuItem value="bungalow">Bungalow</MenuItem>
            <MenuItem value="villa">Villa</MenuItem>
            <MenuItem value="townhouse">Townhouse</MenuItem>
          </Select>
          <FormHelperText>Please choose property type</FormHelperText>
        </FormControl>

        <FormControl required className={styles.formElement}>
          <TextField label="Property area *" name="propertyArea" onChange={props.change} />
          <FormHelperText>Please choose area of your property</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  </div>
);

export default page1;
