import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, FormControl, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import styles from '../Steps.module.css';
import * as actions from '../../../../store/actions/index';
import InfoModal from '../../../../components/InfoModal/InfoModal';

const getCurrency = countryName => {
  switch (countryName) {
    case 'IN': return 'INR';
    case 'US': return 'USD';
    case 'CA': return 'CAD';
    case 'GB': return 'GBP';
    default: return;
  }
}

class Page1 extends Component {
  state = {
    errors: {
      price: '',
      schedule: ''
    }
  }

  priceChangeHandler = event => {
    const { value } = event.target;
    if (isNaN(value)) {
      this.setState({
        errors: { price: 'Price can only be in digits. ' }
      });
    } else if (value < 0) {
      this.setState({
        errors: { price: "Price can't be negative. " }
      });
    } else {
      this.setState({
        errors: { price: '' }
      });
      this.props.onPriceChange(parseInt(value));
    }
  }

  checkInDateChangeHandler = date => {
    const checkInDate = new Date(date);
    const checkOutDate = new Date(this.props.schedule.checkOut);
    if (checkInDate.getTime() < new Date().getTime()) {
      this.setState({
        errors: { schedule: "You can't time travel. " }
      });
      setTimeout(() => this.setState({ errors: { schedule: '' } }), 3000);
    } else if (checkInDate.getTime() < checkOutDate.getTime()) {
      this.props.onScheduleChange({ checkIn: checkInDate, checkOut: checkOutDate });
    } else {
      this.props.onScheduleChange({ checkIn: checkInDate, checkOut: checkInDate });
    }
  }

  checkOutDateChangeHandler = date => {
    const checkInDate = new Date(this.props.schedule.checkIn);
    const checkOutDate = new Date(date);
    if (checkOutDate.getTime() < checkInDate.getTime()) {
      this.setState({
        errors: { schedule: 'Invalid choice of checkout date. ' }
      });
      setTimeout(() => this.setState({ errors: { schedule: '' } }), 3000);
    } else {
      this.props.onScheduleChange({ checkIn: checkInDate, checkOut: checkOutDate });
    }
  }

  render() {
    return (
      <div className={styles.page}>
        <InfoModal 
          loading={this.state.errors.price}
          type="info">
          {this.state.errors.price}
        </InfoModal>
        <InfoModal 
          loading={this.state.errors.schedule}
          type="info">
          {this.state.errors.schedule}
        </InfoModal>

        <h1>What price do you want to set?</h1>
        <p>
          Travelers often search by price. To help increase your chances of getting stay,
          try setting a valid and minimal price.
        </p>
        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>
            <FormControl required className={styles.formElement}>
              <TextField
                label={'Price (' + getCurrency(this.props.country) + ') *'}
                onChange={this.priceChangeHandler}
                value={this.props.price ? this.props.price : ''} />
            </FormControl>
          </Grid>
        </Grid>

        <h1 style={{ marginTop: '12%' }}>When can you host?</h1>
        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                label="Select check-in date"
                format="dd/MM/yyyy"
                onChange={date => this.checkInDateChangeHandler(date)}
                value={this.props.schedule.checkIn}
                className={styles.formElement} />
              <KeyboardDatePicker
                margin="normal"
                label="Select check-out date"
                format="dd/MM/yyyy"
                onChange={date => this.checkOutDateChangeHandler(date)}
                value={this.props.schedule.checkOut}
                className={styles.formElement} />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    country: state.host.country,
    price: state.host.price,
    schedule: state.host.schedule
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPriceChange: price => dispatch(actions.changePrice(price)),
    onScheduleChange: schedule => dispatch(actions.changeSchedule(schedule))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page1);
