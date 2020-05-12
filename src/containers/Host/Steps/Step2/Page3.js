import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { MyLocation } from '@material-ui/icons';

import styles from '../Steps.module.css';
import * as actions from '../../../../store/actions/index';
import InfoModal from '../../../../components/InfoModal/InfoModal';

class Page3 extends Component {
  state = {
    location: {
      lat: 0,
      lon: 0
    },
    address: {
      number: 0,
      street: '',
      city: '',
      state: '',
      country: ''
    },
    errors: {
      location: ''
    }
  }

  locationBtnClickHandler = () => {
    if (navigator.geolocation) {
      // Browser supports fetching location.
      navigator.geolocation.getCurrentPosition(
        position => {
          // get address from mapquest API
          console.log(position.coords);
          this.setState({ errors: { location: '' } });
          this.props.setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
          
        },
        err => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              // get address from ipstack API
              this.setState({
                errors: {
                  location: 'You denied the request for Geolocation. Now, your default location will be used. '
                }
              });
              break;
            case err.POSITION_UNAVAILABLE:
              this.setState({
                errors: {
                  location: 'Location information is unavailable. '
                }
              });
              break;
            case err.TIMEOUT:
              this.setState({
                errors: {
                  location: 'The request to get location timed out. '
                }
              });
              break;
            default:
              this.setState({
                errors: {
                  location: 'An unknown error occured. '
                }
              });
              break;
          }
        }
      );
    } else {
      this.setState({
        errors: {
          location: 'Geolocation is not supported by your browser. '
        }
      });
    }
  }

  render() {
    return (
      <div className={styles.page}>
        <InfoModal loading={this.state.errors.location} type="error">{this.state.errors.location}</InfoModal>
        
        <h1>Where's your place located?</h1>
        <p>Let your place get discovered by your guests.</p>
        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<MyLocation />}
              style={{marginTop: '10%'}}
              onClick={this.locationBtnClickHandler}>
              Use current location
            </Button>
          </Grid>
        </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => dispatch(actions.setLocation(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page3);
