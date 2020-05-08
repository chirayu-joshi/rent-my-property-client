import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import * as actions from '../../../../store/actions/index';
import styles from '../Steps.module.css';
import Counter from '../../../../components/Counter/Counter';
import InfoModal from '../../../../components/InfoModal/InfoModal';

class Page2 extends Component {
  render() {
    return (
      <div className={styles.page}>
        <h1>How many guest can your place accomodate?</h1>
        <p>Check that you have enough beds to accomodate all your guest comfortably</p>

        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>
            <Counter title="Guests" value={1}>How many beds can guest use?</Counter>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Page2;
