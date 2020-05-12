import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import { MyLocation } from '@material-ui/icons';
import axios from 'axios';

import styles from '../Steps.module.css';
import * as actions from '../../../../store/actions/index';
import configs from '../../../../configs';
import secrets from '../../../../secret';
import InfoModal from '../../../../components/InfoModal/InfoModal';

class Page3 extends Component {
  state = {
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
          this.setState({ errors: { location: '' } });
          this.props.setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
          axios.get(configs.mapQuestApiUrl + '/geocoding/v1/reverse', {
            params: {
              key: secrets.mapQuestApiKey,
              location: position.coords.latitude + ',' + position.coords.longitude
            }
          }).then(res => {
            const data = res.data.results[0].locations[0];
            this.props.changeCountry(data.adminArea1);
            this.props.changeState(data.adminArea3);
            this.props.changeCity(data.adminArea5);
          });
        },
        err => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              // get address & location from ipstack API
              this.setState({
                errors: {
                  location: 'You denied the request for Geolocation. So, inaccurate location is used. '
                }
              });
              setTimeout(() => this.setState({ errors: { location: '' } }), 5000);
              axios.get(configs.ipstackUrl + '/check', {
                params: {
                  access_key: secrets.ipstackApiKey,
                  fields: 'country_code,region_name,city,latitude,longitude'
                }
              }).then(res => {
                const data = res.data;
                this.props.changeCountry(data.country_code);
                this.props.changeState(data.region_name);
                this.props.changeCity(data.city);
                this.props.setLocation({ lat: data.latitude, lon: data.longitude });
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
              style={{ marginTop: '10%' }}
              onClick={this.locationBtnClickHandler}>
              Use current location
            </Button>
            <FormControl required className={styles.formElement}>
              <InputLabel>Country</InputLabel>
              <Select
                onChange={e => this.props.changeCountry(e.target.value)}
                value={this.props.country}>
                <MenuItem disabled><em>Select Country</em></MenuItem>
                <MenuItem value="IN">India</MenuItem>
                <MenuItem value="US">America</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="GB">Great Britain</MenuItem>
              </Select>
            </FormControl>
            <FormControl required className={styles.formElement}>
              <TextField
                label="State *"
                onChange={e => this.props.changeState(e.target.value)}
                value={this.props.state} />
            </FormControl>
            <FormControl required className={styles.formElement}>
              <TextField
                label="City *"
                onChange={e => this.props.changeCity(e.target.value)}
                value={this.props.city} />
            </FormControl>
            <FormControl required className={styles.formElement}>
              <TextField
                label="Street address *"
                onChange={e => this.props.changeStreet(e.target.value)}
                value={this.props.street} />
            </FormControl>
            <FormControl required className={styles.formElement}>
              <TextField
                label="House / Flat Number"
                onChange={e => this.props.changeNumber(e.target.value)}
                value={this.props.number} />
            </FormControl>
          </Grid>
        </Grid>

        <h1 style={{ marginTop: '12%' }}>Is the pin in the right place?</h1>
        <p>If needed, you can adjust the map so the pin is in the right location.</p>
        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>

          </Grid>
        </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.host.location,
    country: state.host.country,
    state: state.host.state,
    city: state.host.city,
    street: state.host.street,
    number: state.host.number
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => dispatch(actions.setLocation(location)),
    changeCountry: country => dispatch(actions.changeCountry(country)),
    changeState: state => dispatch(actions.changeState(state)),
    changeCity: city => dispatch(actions.changeCity(city)),
    changeStreet: street => dispatch(actions.changeStreet(street)),
    changeNumber: number => dispatch(actions.changeNumber(number)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page3);
