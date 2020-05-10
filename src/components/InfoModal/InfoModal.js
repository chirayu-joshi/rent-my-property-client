import React from 'react';

import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

import './InfoModal.css';

const infoModal = props => {
  let classes = ['infoModal__container'];
  if (props.loading) {
    classes.push('infoModal__show');
  } else {
    classes = ['infoModal__container'];
  }
  switch(props.type) {
    case 'error':
      classes.push('infoModal__error');
      break;
    case 'info':
      classes.push('infoModal__info');
      break
    case 'success':
      classes.push('infoModal__success');
      break;
    default:
      break;
  }
  return (
    <div className={classes.join(' ')}>
      <LoadingAnimation />
      <h2>{props.children}</h2>
    </div>
  );
}

export default infoModal;
