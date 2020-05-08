import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import styles from '../Steps.module.css';
import { Grid, FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

class Page3 extends Component {
  state = {
    amenities: [
      { label: 'Wifi', value: 'wifi' },
      { label: 'TV', value: 'tv' },
      { label: 'Air Conditioning', value: 'ac' },
      { label: 'Heater', value: 'heater' },
      { label: 'Iron', value: 'iron' },
      { label: 'Desk', value: 'desk' },
      { label: 'Drawer', value: 'drawer' }
    ],
    facilities: [
      { label: 'Parking', value: 'parking' },
      { label: 'Pool', value: 'pool' },
      { label: 'Kitchen', value: 'kitchen' },
      { label: 'Washing Machine', value: 'washingMachine' },
      { label: 'Gym', value: 'gym' }
    ]
  }

  amenityCheckboxChangeHandler = e => {
    const { value, checked } = e.target;
    if (checked) {
      this.props.addAmenity(value);
    } else {
      this.props.removeAmenity(value);
    }
  }

  facilityCheckboxChangeHandler = e => {
    const { value, checked } = e.target;
    if (checked) {
      this.props.addFacility(value);
    } else {
      this.props.removeFacility(value);
    }
  }

  render() {
    return (
      <div className={styles.page}>
        <h1>What amenities do you offer?</h1>
        <p>These are amenities that guest usually expects.</p>
        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>
            <FormControl component="fieldset">
              <FormGroup>
                {this.state.amenities.map(amenity =>
                  <FormControlLabel
                    label={amenity.label}
                    labelPlacement="end"
                    value={amenity.value}
                    key={amenity.value}
                    control={
                      <Checkbox
                        color="primary"
                        onClick={this.amenityCheckboxChangeHandler.bind(this)}
                        checked={this.props.amenities.indexOf(amenity.value) !== -1} />
                    } />
                )}
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>

        <h1 style={{marginTop: '40px'}}>What spaces can guests use?</h1>
        <p>Include spaces of your property which you can share with the guest</p>
        <Grid container style={{marginBottom: '40px'}}>
          <Grid item xs={12} sm={9} xl={7}>
            <FormControl component="fieldset">
              <FormGroup>
                {this.state.facilities.map(facility =>
                  <FormControlLabel
                    label={facility.label}
                    labelPlacement="end"
                    value={facility.value}
                    key={facility.value}
                    control={
                      <Checkbox
                        color="primary"
                        onClick={this.facilityCheckboxChangeHandler.bind(this)}
                        checked={this.props.facilities.indexOf(facility.value) !== -1} />
                    } />
                )}
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    amenities: state.host.amenities,
    facilities: state.host.facilities
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAmenity: amenity => dispatch(actions.addAmenity(amenity)),
    removeAmenity: amenity => dispatch(actions.removeAmenity(amenity)),
    addFacility: facility => dispatch(actions.addFacility(facility)),
    removeFacility: facility => dispatch(actions.removeFacility(facility))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page3);
