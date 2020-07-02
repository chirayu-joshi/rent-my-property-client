import React from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import styles from './ReviewInput.module.css';

const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick }) => {
  let svgStyles = { fill: '#d8d8d8' };
  if (rating >= starId) {
    svgStyles = { fill: 'gold' };
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}>
      <svg
        style={svgStyles}
        height="24px"
        width="24px"
        viewBox="0 0 24 24"
        data-rating="1">
        <polygon
          stroke-width="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
      </svg>
    </div>
  );
}

const reviewInput = props => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: 'flex', paddingTop: '7px' }}>
      <span>{localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')}</span>
      <div className={styles.input}>
        <div className={styles.stars}>
          {stars.map(star =>
            <Star
              key={star}
              starId={star}
              rating={props.hoverState || props.rating}
              onMouseEnter={() => props.setHoverState(star)}
              onMouseLeave={() => props.setHoverState(0)}
              onClick={() => props.setRating(star)} />
          )}
        </div>
        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            multiline
            placeholder="Your review"
            value={props.reviewInput}
            onChange={e => props.reviewChange(e.target.value)} />
          <IconButton onClick={() => props.submitReview()}>
            <Send fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default reviewInput;