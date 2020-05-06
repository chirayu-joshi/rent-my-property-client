import React from 'react';
import { Link } from 'react-router-dom';

// import styles from './StepCard.module.css';

const stepCard = props => {
  let continueBtn = null;
  let changeLink = null;
  let inlineStyles = {};
  if (props.step < props.currentStep) {
    changeLink = <Link to={props.to}>Change</Link>;
  } else if (props.step === props.currentStep) {
    continueBtn = <button>Continue</button>;
  } else {
    inlineStyles = {
      opacity: "0.3"
    }
  }
  return (
    <div style={inlineStyles}>
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
      {continueBtn}
      {changeLink}
    </div>
  )
};

export default stepCard;
