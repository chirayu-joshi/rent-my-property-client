import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Snackbar, IconButton, Hidden, Grid } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import axios from '../../axios';

import styles from './Dashboard.module.css';
import * as actions from '../../store/actions/index';
import secrets from '../../secret';
import locationIcon from '../../assets/icons/locationMark';
import ImageContainer from '../ImageContainer/ImageContainer';
import Navbar from '../Navbar/Navbar';
import Filters from '../Filters/Filters';
import Posts from '../Posts/Posts';

const mapIcon = L.icon({
  iconUrl: locationIcon,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

const getCurrency = country => {
  switch (country) {
    case 'IN': return 'INR';
    case 'US': return 'USD';
    case 'CA': return 'CAD';
    case 'GB': return 'GBP';
    default: return;
  }
}

class Dashboard extends Component {
  // markersData may not be useful outside dashboard,
  // so it is managed locally in local state.
  state = {
    markersData: [],
    snackbarOpen: true
  }

  componentDidMount() {
    // Markers are shown worldwide. Post are shown by country.
    axios
      .get('/api/stay/markers')
      .then(res => {
        this.setState({ markersData: res.data.markersData });
      })
      .catch(err => {
        console.log(err);
      });

    // Country and Location both are initialised by initLocation()
    this.props.initLocation()
      .then(res => {
        // Fetch Posts according to country location.
        this.props.fetchPostsByCountryCode(res.country_code);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let markers = null;
    if (this.state.markersData !== []) {
      markers = this.state.markersData.map(markerData => (
        <Marker
          key={markerData._id}
          position={[markerData.location.lat, markerData.location.lon]}
          icon={mapIcon}>
          <Popup>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1 }}>
                <ImageContainer
                  src={secrets.baseURL + '/api/images/id/' + markerData.imageIds[0]}
                  style={{ padding: '0' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h4>{markerData.propertyName}</h4>
                <h3>{markerData.price + ' ' + getCurrency(markerData.address.country)}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{markerData.propertyArea}<span> ft<sup>2</sup></span></span>
                  <Link to="" style={{ margin: '2px', textDecoration: 'underline' }}>more</Link>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))
    }

    return (
      <div className={styles.dashboard}>
        <Grid container>

          <Hidden mdDown>
            <Grid item lg={6}>
              <div className={styles.mapContainer}>
                <Map
                  center={[this.props.location.lat, this.props.location.lon]}
                  zoom={this.props.zoom}
                  style={{ width: '100%', height: '100%' }}>
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {markers}
                </Map>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  open={this.state.snackbarOpen}
                  onClose={() => this.setState({ snackbarOpen: false })}
                  message="Click on markers for more info"
                  action={
                    <IconButton size="small" color="inherit" onClick={() => this.setState({ snackbarOpen: false })}>
                      <Close fontSize="small" />
                    </IconButton>
                  } />
              </div>
            </Grid>
          </Hidden>

          <Grid item xs={12} lg={6} className={styles.containerWrapper}>
            <div className={styles.container}>
              <Navbar />
              <section className={styles.posts}>
                <h2 className={styles.title}>
                  <span>{this.props.posts.length} Properties </span>
                  in <span className={styles.country}>{this.props.country}</span>
                </h2>
                <Filters />
                <Posts />
              </section>
            </div>
          </Grid>

        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.map.location,
    zoom: state.map.zoom,
    country: state.map.country,
    posts: state.map.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initLocation: () => dispatch(actions.initLocation()),
    fetchPostsByCountryCode: countryCode => dispatch(actions.fetchPostsByCountryCode(countryCode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
