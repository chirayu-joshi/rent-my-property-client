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
import ReviewInput from '../../components/ReviewInput/ReviewInput';
import Reviews from '../../components/Reviews/Reviews';

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
    sendingReview: false,
    errorOccured: false,
    starHoverState: 0,
    reviewStars: 0,
    reviewInput: '',
    reviews: []
  }

  reviewStarsChangeHandler = rating => {
    this.setState({ reviewStars: rating });
  }

  reviewInputChangeHandler = review => {
    this.setState({ reviewInput: review });
  }

  starHoverStateChangeHandler = rating => {
    this.setState({ starHoverState: rating });
  }

  submitReviewHandler = () => {
    if (this.state.reviewInput !== '') {
      this.setState({ sendingReview: true });
      const data = {
        stars: this.state.reviewStars,
        review: this.state.reviewInput,
        postId: this.state.post._id
      }
      axios
        .post('/api/stay/post/review', data)
        .then(res => {
          this.setState({
            sendingReview: false,
            reviewStars: 0,
            reviewInput: '',
            reviews: res.data.updatedReviews
          });
        })
        .catch(err => {
          this.setState({ errorOccured: true });
          setTimeout(() => this.setState({ errorOccured: false }), 5000);
          console.log(err);
        });
    }
  }

  componentDidMount() {
    this.setState({ fetchingPost: true });
    axios
      .get(`/api/stay/posts/id/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          post: res.data.post,
          fetchingPost: false
        });
        this.props.zoomLocation(res.data.post.location);
      })
      .then(res => {
        axios
          .get('/api/stay/post/reviews/' + this.props.match.params.id)
          .then(res => {
            this.setState({ reviews: res.data.reviews });
          })
          .catch(err => {
            console.log('get request error: ' + err);
          });
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
        <InfoModal
          loading={this.state.sendingReview}
          type="loading">
          Sending review...
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

        <h2 className={styles.heading}>Reviews</h2>
        {this.props.isAuthenticated
          ? <ReviewInput
            changed={this.reviewInputChangeHandler}
            rating={this.state.reviewStars}
            reviewInput={this.state.reviewInput}
            hoverState={this.state.starHoverState}
            setRating={this.reviewStarsChangeHandler}
            setHoverState={this.starHoverStateChangeHandler}
            reviewChange={this.reviewInputChangeHandler}
            submitReview={this.submitReviewHandler} />
          : <p style={{ color: '#f66', margin: '7px 0', }}>Please Login to add review</p>}

        <Reviews reviews={this.state.reviews} />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    zoomLocation: location => dispatch(actions.zoomLocation(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
