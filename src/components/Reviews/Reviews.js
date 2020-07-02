import React from 'react';

import styles from './Reviews.module.css';
import timeAgo from '../../util/timeAgo';

const Star = ({ times }) => {
  if (times === 0) {
    return null;
  }
  let starSVGs = [];
  for (let i = 0; i < times; ++i) {
    starSVGs.push(1);
  }
  return (
    <div>
      {starSVGs.map(_ =>
        <svg
          style={{ fill: 'gold' }}
          height="16px"
          width="16px"
          viewBox="0 0 24 24"
          data-rating="1">
          <polygon
            stroke-width="0"
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
        </svg>
      )}
    </div>
  );
}

const reviews = props => {
  return (
    <div>
      <h3 className={styles.reviewCount}>
        {props.reviews.length + ' review' + (props.reviews.length > 1 ? 's' : '')}
      </h3>
      {props.reviews.map(review =>
        <div key={review._id} className={styles.reviewBox}>
          <div className={styles.profilePic}>
            {review.from.toUpperCase().split(' ')[0][0] + review.from.toUpperCase().split(' ')[1][0]}
          </div>
          <div className={styles.reviewSection}>
            <div>
              <span className={styles.username}>{review.from}</span>
              <Star times={review.stars} />
              <span className={styles.review}>{review.review}</span>
            </div>
            <div className={styles.time}>
              <span>{timeAgo(review.reviewedAt)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default reviews;
