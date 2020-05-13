import React, { Component } from 'react';
import { Grid, Button, Hidden } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

import { Page1, Page2 } from '.';
import styles from '../Steps.module.css';
import AppBar from '../../../../components/AppBar/AppBar';
import InfoModal from '../../../../components/InfoModal/InfoModal';
import FormGridContainer from '../../../../components/FormGridContainer/FormGridContainer';
import buyHouseSVG from '../../../../assets/illustrations/SVGs/buy_house.svg';
import checklistSVG from '../../../../assets/illustrations/SVGs/checklist.svg';

class Step3 extends Component {
  state = {
    currentPage: 1,
    totalPages: 2,
    errors: {
      requiredFields: ''
    }
  }

  prevBtnClickHandler = () => {
    this.setState({
      currentPage: this.state.currentPage > 1 ?
        this.state.currentPage - 1 : this.state.currentPage
    });
  }

  nextBtnClickHandler = () => {
    // let errors = this.state.errors;
    switch (this.state.currentPage) {
      case 1:
        this.setState({ currentPage: this.state.currentPage + 1 });
        break;
      default:
        break;
    }
  }

  finishBtnClickHandler = () => {
    // this.props.nextStep();
    this.props.history.push('/host');
  }

  render() {
    let nextBtn =
      <Button
        variant="contained"
        size="large"
        color="primary"
        endIcon={<NavigateNext />}
        onClick={this.nextBtnClickHandler}>
        Next
      </Button>
    if (this.state.currentPage === this.state.totalPages) {
      nextBtn =
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => this.finishBtnClickHandler()}>
          Finish
        </Button>
    }

    let inlineStyles = {};
    let imageSVG = null;
    let Page = null;
    switch (this.state.currentPage) {
      case 1:
        inlineStyles = {
          opacity: 0.3
        };
        Page = <Page1 />;
        imageSVG = buyHouseSVG;
        break;
      case 2:
        Page = <Page2 />;
        imageSVG = checklistSVG;
        break;
      default:
        break;
    }

    return (
      <div className={styles.container}>
        <InfoModal
          loading={this.state.errors.requiredFields}
          type="error">
          {this.state.errors.requiredFields}
        </InfoModal>
        <AppBar exit="/host" parentProps={this.props}>
          Step 3: Get ready for guests
        </AppBar>
        <FormGridContainer>
          <Grid item xs={11} lg={4} className={styles.formContainer}>
            <div className={styles.pageContainer}>
              {Page}
            </div>
            <div className={styles.btnContainer}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<NavigateBefore />}
                style={inlineStyles}
                onClick={() => this.prevBtnClickHandler()}>
                Back
              </Button>
              {nextBtn}
            </div>
          </Grid>
          <Hidden mdDown>
            <Grid item lg={5}>
              <img src={imageSVG} className={styles.svgImg} alt="svg" />
            </Grid>
          </Hidden>
        </FormGridContainer>
      </div>
    );
  }
}

export default Step3;
