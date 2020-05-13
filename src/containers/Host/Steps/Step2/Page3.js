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
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from '../../../../axios';

import styles from '../Steps.module.css';
import * as actions from '../../../../store/actions/index';
import secrets from '../../../../secret';
import InfoModal from '../../../../components/InfoModal/InfoModal';
import locationIcon from '../../../../assets/icons/locationMark';

const mapIcon = L.icon({
  iconUrl: locationIcon,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

class Page3 extends Component {
  state = {
    zoom: 8,
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
          /** Making http request from our https website will give CORS error.
           * To solve it, send https request to our server, server will send 
           * request to ipstack and return response from there.
           * This will also protect our API key, as server would only have it.
           */
          axios.get(secrets.baseURL + '/api/ext/mapQuest/' + position.coords.latitude + ',' + position.coords.longitude)
            .then(res => {
              const data = res.data.results[0].locations[0];
              this.props.changeCountry(data.adminArea1);
              this.props.changeState(data.adminArea3);
              this.props.changeCity(data.adminArea5);
            }).catch(err => {
              console.log('Error while fetching address from location.');
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
              axios.get(secrets.baseURL + '/api/ext/ipstack')
                .then(res => {
                  const data = res.data;
                  this.props.changeCountry(data.country_code);
                  this.props.changeState(data.region_name);
                  this.props.changeCity(data.city);
                  this.props.setLocation({ lat: data.latitude, lon: data.longitude });
                }).catch(err => {
                  console.log('Error while fetching address from IP address');
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

  mapDragHandler = e => {
    const center = e.target.getCenter();
    this.props.setLocation({ lat: center.lat, lon: center.lng });
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
        <Map
          center={[this.props.location.lat, this.props.location.lon]}
          zoom={this.state.zoom}
          onDrag={e => this.mapDragHandler(e)}
          onZoomEnd={e => this.setState({ zoom: e.target._zoom })}
          className={styles.map}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[this.props.location.lat, this.props.location.lon]}
            icon={mapIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>

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
