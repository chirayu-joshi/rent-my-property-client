import React, { Component } from 'react';
import { Grid, Hidden, Button } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

import { Page1, Page2, Page3 } from '.';
import AppBar from '../../../../components/AppBar/AppBar';
import InfoModal from '../../../../components/InfoModal/InfoModal';
import FormGridContainer from '../../../../components/FormGridContainer/FormGridContainer';
import styles from '../Steps.module.css';
import townSVG from '../../../../assets/illustrations/SVGs/town.svg';
import choosingHouseSVG from '../../../../assets/illustrations/SVGs/choosing_house.svg';
import smartHomeSVG from '../../../../assets/illustrations/SVGs/smart_home.svg';

class Step1 extends Component {
  state = {
    currentPage: 1,
    totalPages: 3,
    propertyType: '',
    propertyArea: 0,
    guestCapacity: 0,
    rooms: 0,
    beds: 0,
    bedrooms: 0,
    amenities: [],
    facilities: [],
    errors: {
      propertyArea: '',
      emptyInputs: '',
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
    console.log(this.state);
    switch (this.state.currentPage) {
      case 1:
        let errors = this.state.errors;
        if (this.state.propertyArea !== 0 && 
            this.state.propertyType !== '' && 
            errors.propertyArea === '') {
          errors.requiredFields = '';
          this.setState({
            currentPage: this.state.currentPage < this.state.totalPages ?
              this.state.currentPage + 1 : this.state.currentPage,
            errors
          });
        } else {
          errors.requiredFields = 'Please fill out all input fields correctly. ';
          this.setState({
            errors
          });
        }
        break;
      default:
        break;
    }
  }

  finishBtnClickHandler = () => {
    console.log('finish btn clicked');
  }

  inputChangeHandler = event => {
    // All int values will we stored as string,
    // but while storing to central store, they will be parsed.
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'propertyArea':
        errors.propertyArea =
          isNaN(value)
            ? 'Area can only be in digits. '
            : ''
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }

  onSubmitHandler = () => {
    // parse value to int at last while submitting
    // check if propertyType is null or not while submitting
  }

  render() {
    let nextBtn =
      <Button
        variant="contained"
        size="large"
        color="primary"
        endIcon={<NavigateNext />}
        onClick={() => this.nextBtnClickHandler()}>
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
        Page = Page1;
        imageSVG = townSVG;
        break;
      case 2:
        Page = Page2;
        imageSVG = choosingHouseSVG;
        break;
      case 3:
        Page = Page3;
        imageSVG = smartHomeSVG;
        break;
      default:
        break;
    }

    let errorMessage = '';
    Object.values(this.state.errors).forEach(error => {
      errorMessage += error;
    });

    return (
      <div className={styles.container}>
        <InfoModal loading={errorMessage !== ''} type="info">{errorMessage}</InfoModal>
        <InfoModal 
          loading={this.state.errors.requiredFields !== ''} 
          type="error">
          {this.state.errors.requiredFields}
        </InfoModal>
        <AppBar exit="/host" parentProps={this.props}>
          Step 1: Start with basics
        </AppBar>
        <FormGridContainer>
          <Grid item xs={11} lg={4} className={styles.formContainer}>
            <div className={styles.pageContainer}>
              <Page change={this.inputChangeHandler} />
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
              <img src={imageSVG} className={styles.svgImg} alt="town.svg" />
            </Grid>
          </Hidden>
        </FormGridContainer>
      </div>
    );
  }
}

export default Step1;
