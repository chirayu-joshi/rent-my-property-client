import React, { Component } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {
  Hotel,
  MeetingRoom,
  PeopleOutline,
  AspectRatio,
  Wifi,
  Tv,
  CallToAction,
  Power,
  Keyboard,
  AllInbox,
  LocalParking,
  Pool,
  Kitchen,
  LocalDrink,
  FitnessCenter,
} from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

import * as actions from '../../store/actions';
import secrets from '../../secret';
import styles from './Post.module.css';
import InfoModal from '../../components/InfoModal/InfoModal';
import ImageContainer from '../ImageContainer/ImageContainer';

const getCountry = countryCode => {
  switch (countryCode) {
    case 'IN': return 'India';
    case 'US': return 'USA';
    case 'CA': return 'Canada';
    case 'GB': return 'Great Britain';
    default: return;
  }
}

const getCurrency = country => {
  switch (country) {
    case 'IN': return 'INR';
    case 'US': return 'USD';
    case 'CA': return 'CAD';
    case 'GB': return 'GBP';
    default: return;
  }
}

const getPricePerDay = (price, schedule) => {
  const checkIn = new Date(schedule.checkIn);
  const checkOut = new Date(schedule.checkOut);

  const diffTime = checkOut.getTime() - checkIn.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);

  return price / diffDays;
}

class Post extends Component {
  state = {
    post: {},
    fetchingPost: false,
    errorOccured: false
  }

  componentDidMount() {
    this.setState({ fetchingPost: true });
    axios
      .get(`/api/stay/post/${this.props.match.params.id}`)
      .then(res => {
        /*
          post:
            reviews: []
            rules: (3) ["pets", "events", "children"]
            languages: (2) ["english", "hindi"]
            facilities: (3) ["parking", "washingMachine", "kitchen"]
            amenities: (3) ["wifi", "tv", "desk"]
            address: {number: "404", street: "Abcd road", city: "Navsari", state: "Gujarat", country: "IN"}
            schedule: {checkIn: "2020-05-20T11:18:00.000Z", checkOut: "2020-05-31T11:18:00.000Z"}
            beds: 4
            rooms: 2
            guestCapacity: 4
            propertyArea: 1234
            propertyType: "bungalow"
            price: 60000
            imageIds: (2) ["5ebfcc7a8906512216ecd056", "5ebfcc7a8906512216ecd057"]
            location: {lat: 20.95077921328728, lon: 72.95333965361696}
            propertyDescription: "This is my bungalow located near sea area, nice place to live."
            propertyName: "My big bungalow"
            uploaderId: "5ebabbb64820cb0017310d73"
            __v: 0
            _id: "5ebfcd7e8906512216ecd05d"
        */
        this.setState({
          post: res.data.post,
          fetchingPost: false
        });
        this.props.zoomLocation(res.data.post.location);
      })
      .catch(err => {
        console.log(err);
        this.setState({ errorOccured: true, fetchingPost: false });
        setTimeout(() => this.setState({ errorOccured: false }), 5000);
      });
  }

  render() {
    let addressString = '';
    for (const addressKey in this.state.post.address) {
      if (addressKey === 'country') {
        getCountry(this.state.post.address[addressKey]);
        break;
      }
      addressString += this.state.post.address[addressKey] + ', ';
    }
    addressString = addressString.slice(0, -2);

    let amenities;
    if (this.state.post.amenities) {
      amenities = this.state.post.amenities.map(amenity => {
        switch (amenity) {
          case 'wifi':
            return <div className={styles.signs} key={amenity}><Wifi color="primary" /><span>Wifi</span></div>;
          case 'tv':
            return <div className={styles.signs} key={amenity}><Tv color="action" /><span>Television</span></div>;
          case 'ac':
            return <div className={styles.signs} key={amenity}><CallToAction color="primary" /><span>Air Conditioner</span></div>;
          case 'heater':
            return <div className={styles.signs} key={amenity}><CallToAction color="secondary" /><span>Heater</span></div>;
          case 'iron':
            return <div className={styles.signs} key={amenity}><Power color="primary" /><span>Iron</span></div>;
          case 'desk':
            return <div className={styles.signs} key={amenity}><Keyboard /><span>Desk</span></div>;
          case 'drawer':
            return <div className={styles.signs} key={amenity}><AllInbox style={{ color: green[500] }} /><span>Drawer</span></div>;
          default: return null;
        }
      });
    }

    let facilities;
    if (this.state.post.facilities) {
      facilities = this.state.post.facilities.map(facility => {
        switch (facility) {
          case 'parking':
            return <div className={styles.signs} key={facility}><LocalParking color="secondary" /><span>Parking</span></div>;
          case 'pool':
            return <div className={styles.signs} key={facility}><Pool color="primary" /><span>Pool</span></div>;
          case 'kitchen':
            return <div className={styles.signs} key={facility}><Kitchen style={{ color: green[500] }} /><span>Kitchen</span></div>;
          case 'washingMachine':
            return <div className={styles.signs} key={facility}><LocalDrink color="primary" /><span>Washing Machine</span></div>;
          case 'gym':
            return <div className={styles.signs} key={facility}><FitnessCenter /><span>Gym</span></div>;
          default: return null;
        }
      });
    }

    let languages;
    if (this.state.post.languages) {
      languages = <ul className={styles.ul}>
        {this.state.post.languages.map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>;
    }

    let rules;
    let allRules = ['pets', 'smoking', 'children', 'events', 'party'];
    if (this.state.post.rules) {
      rules = <ul className={styles.ul}>
        {this.state.post.rules.map(rule =>
          <li key={rule}>{rule} allowed</li>
        )}
        {allRules.map(rule =>
          !this.state.post.rules.includes(rule) ? <li key={rule}>{rule} not allowed</li> : null
        )}
      </ul>;
    }

    return (
      <div className={styles.post}>

        <InfoModal
          loading={this.state.fetchingPost}
          type="loading">
          Loading Post...
        </InfoModal>
        <InfoModal
          loading={this.state.errorOccured}
          type="error">
          Something went wrong
        </InfoModal>

        <OwlCarousel
          loop
          items={1}
          autoplay
          autoplayHoverPause
          lazyLoad>
          {this.state.post.imageIds && this.state.post.imageIds.map(imageId =>
            <ImageContainer
              key={imageId}
              src={secrets.baseURL + '/api/images/id/' + imageId}
              preImgHeight='30vh' />
          )}
        </OwlCarousel>

        <h1
          style={this.state.post.imageIds && this.state.post.imageIds.length < 2
            ? { marginTop: '24px' }
            : {}}
          className={styles.mainHeading}>
          {this.state.post.propertyName}
          <span className={styles.price}>
            {' '}( {
              this.state.post.price
                ? Math.round(getPricePerDay(this.state.post.price, this.state.post.schedule))
                + ' ' + getCurrency(this.state.post.address.country) + ' / Day'
                : 'Wait a moment'
            } )
          </span>
        </h1>

        <div className={styles.propertyDetails}>
          <div className={styles.icon} title="beds">
            <Hotel fontSize="small" />
            <span>{this.state.post.beds} Beds</span>
          </div>
          <div className={styles.icon} title="rooms">
            <MeetingRoom fontSize="small" />
            <span>{this.state.post.rooms} Rooms</span>
          </div>
          <div className={styles.icon} title="guest capacity">
            <PeopleOutline fontSize="small" />
            <span>
              {this.state.post.guestCapacity + ' '
                + (this.state.post.guestCapacity > 1 ? 'People' : 'Person')}
            </span>
          </div>
          <div className={styles.icon} title="area">
            <AspectRatio fontSize="small" />
            <span>{this.state.post.propertyArea} ft<sup>2</sup></span>
          </div>
        </div>

        <p className={styles.description}>{this.state.post.propertyDescription}</p>

        <h2 className={styles.heading}>Address</h2>
        <p className={styles.description}>{addressString}</p>

        <h2 className={styles.heading}>Amenities</h2>
        <div className={styles.signsContainer}>{amenities}</div>

        <h2 className={styles.heading}>Facilities</h2>
        <div className={styles.signsContainer}>{facilities}</div>

        <h2 className={styles.heading}>Languages</h2>
        <p className={styles.description}>Host of this property knows these languages:</p>
        {languages}

        <h2 className={styles.heading}>Rules</h2>
        <p className={styles.description}>In order to stay, you must accept these rules:</p>
        {rules}

        <div style={{ height: '30px', width: '100%' }}></div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    zoomLocation: location => dispatch(actions.zoomLocation(location))
  }
}

export default connect(null, mapDispatchToProps)(Post);
