import React from 'react';
import { Edit, ArrowForward } from '@material-ui/icons';
import { IconButton, Fab } from '@material-ui/core';

import styles from './StepCard.module.css';

const stepCard = props => {
  let continueBtn = null;
  let changeBtn = null;
  let inlineStyles = {};
  if (props.step < props.currentStep) {
    changeBtn =
      <IconButton 
        color="secondary"
        onClick={() => props.parentProps.history.push(props.to)}
        className={styles.editBtn}>
        <Edit />
      </IconButton>
  } else if (props.step === props.currentStep) {
    continueBtn = 
      <Fab 
        color="secondary" 
        className={styles.addBtn}
        onClick={() => props.parentProps.history.push(props.to)}>
        <ArrowForward />
      </Fab>
  } else {
    inlineStyles = {
      opacity: "0.3"
    }
  }
  return (
    <div className={styles.container} style={inlineStyles}>
      <h3 className={styles.smallHeading}>STEP {props.step}</h3>
      <h2 className={styles.heading2}>{props.title}</h2>
      <p>{props.subtitle}</p>
      {continueBtn}
      {changeBtn}
    </div>
  )
};

export default stepCard;
