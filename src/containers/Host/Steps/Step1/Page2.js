import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import * as actions from '../../../../store/actions/index';
import styles from '../Steps.module.css';
import Counter from '../../../../components/Counter/Counter';

class Page2 extends Component {
  render() {
    return (
      <div className={styles.page}>
        <h1>How many guest can your place accomodate?</h1>
        <p>Check that you have enough beds to accomodate all your guest comfortably</p>

        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>
            <Counter 
              title="Guests" 
              value={this.props.guestCapacity} 
              minValue={1}
              add={this.props.increaseGuestCapacity} 
              subtract={this.props.decreaseGuestCapacity}>
              How many guest can be stay?
            </Counter>
            <Counter
              title="Rooms"
              value={this.props.rooms}
              minValue={1}
              add={this.props.increaseRooms}
              subtract={this.props.decreaseRooms}>
              How many rooms can guest use?
            </Counter>
            <Counter
              title="Beds"
              value={this.props.beds}
              minValue={1}
              add={this.props.increaseBeds}
              subtract={this.props.decreaseBeds}>
              How many beds can guest use?
            </Counter>
          </Grid>
        </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    guestCapacity: state.host.guestCapacity,
    rooms: state.host.rooms,
    beds: state.host.beds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseGuestCapacity: () => dispatch(actions.increaseGuestCapacity()),
    decreaseGuestCapacity: () => dispatch(actions.decreaseGuestCapacity()),
    increaseRooms: () => dispatch(actions.increaseRooms()),
    decreaseRooms: () => dispatch(actions.decreaseRooms()),
    increaseBeds: () => dispatch(actions.increaseBeds()),
    decreaseBeds: () => dispatch(actions.decreaseBeds())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page2);
