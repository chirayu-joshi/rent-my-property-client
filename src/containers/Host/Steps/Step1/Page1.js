import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Grid
} from '@material-ui/core';

import * as actions from '../../../../store/actions/index';
import styles from '../Steps.module.css';
import InfoModal from '../../../../components/InfoModal/InfoModal';

class Page1 extends Component {
  state = {
    errors: {
      propertyArea: ''
    }
  }

  inputChangeHandler = event => {
    const { value } = event.target;
    let errors = this.state.errors;

    errors.propertyArea =
      isNaN(value)
        ? 'Area can only be in digits. '
        : ''
    this.setState({
      errors
    });
    this.props.onInputChange(parseInt(value));
  }

  render() {
    let errorMessage = '';
    Object.values(this.state.errors).forEach(error => {
      errorMessage += error;
    });

    return (
      <div className={styles.page}>
        <InfoModal loading={errorMessage !== ''} type="info">{errorMessage}</InfoModal>
        <h1>What kind of property are you listing?</h1>

        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>

            <FormControl required className={styles.formElement}>
              <InputLabel>Property type</InputLabel>
              <Select 
                onChange={e => this.props.onSelectChange(e.target.value)} 
                value={this.props.propertyType}>
                <MenuItem disabled><em>Select Property Type</em></MenuItem>
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
              <TextField 
                label={'Property area (in sq.ft) *'}
                onChange={this.inputChangeHandler} 
                value={this.props.propertyArea ? this.props.propertyArea : ''} />
              <FormHelperText>Please choose area of your property</FormHelperText>
            </FormControl>
            
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    propertyArea: state.host.propertyArea,
    propertyType: state.host.propertyType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: (input) => dispatch(actions.changePropertyArea(input)),
    onSelectChange: (input) => dispatch(actions.changePropertyType(input))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page1);
