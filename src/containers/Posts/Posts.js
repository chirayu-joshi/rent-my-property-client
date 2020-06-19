import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core'
import { PeopleOutline, StarBorder, CropLandscape } from '@material-ui/icons';

import styles from './Posts.module.css';
import secrets from '../../secret';
import ImageContainer from '../ImageContainer/ImageContainer';

const getCurrency = country => {
  switch (country) {
    case 'IN': return 'INR';
    case 'US': return 'USD';
    case 'CA': return 'CAD';
    case 'GB': return 'GBP';
    default: return;
  }
}

const calStars = reviews => {
  if (reviews.length === 0) {
    return 0;
  } else {
    const totalReviews = reviews.length;
    let starSum = 0;
    reviews.forEach(review => {
      starSum += review.stars
    });
    return starSum / totalReviews;
  }
}

class Posts extends Component {
  render() {
    return (
      <div className={styles.postContainer}>
        <Grid container spacing={2}>
          {this.props.posts.map(post => (
            <Grid item key={post._id} xs={12} sm={4} md={3} lg={6} xl={4}>
              <div
                className={styles.post}
                onClick={() => console.log('post clicked')}>
                <div className={styles.img}>
                  <ImageContainer
                    src={secrets.baseURL + '/api/images/id/' + post.imageIds[0]}
                    preImgHeight='100%' />
                </div>
                <div className={styles.details}>
                  <h3 className={styles.pName}>{post.propertyName} <span>{'(' + post.propertyType + ')'}</span></h3>
                  <p>{post.propertyDescription}</p>
                  <h3 className={styles.price}>{post.price + ' ' + getCurrency(this.props.countryCode)}</h3>
                  <div className={styles.postFooter}>
                    <div className={styles.guestCapacity}>
                      <PeopleOutline fontSize="small" />
                      <span>{post.guestCapacity}</span>
                    </div>
                    <div className={styles.stars}>
                      <StarBorder fontSize="small" />
                      <span>{calStars(post.reviews)}</span>
                    </div>
                    <div className={styles.pArea}>
                      <CropLandscape fontSize="small" />
                      <span>{post.propertyArea} ft<sup>2</sup></span>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.map.posts,
    countryCode: state.map.countryCode
  }
}

export default connect(mapStateToProps)(Posts);
