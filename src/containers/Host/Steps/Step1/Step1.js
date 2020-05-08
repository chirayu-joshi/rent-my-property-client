import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    let errors = this.state.errors;
    switch (this.state.currentPage) {
      case 1:
        if (this.props.propertyArea !== 0 && this.props.propertyType !== '') {
          errors.requiredFields = ''
          this.setState({
            currentPage: this.state.currentPage + 1,
            errors
          });
        } else {
          errors.requiredFields = 'Please fill out all input fields correctly. ';
          this.setState({
            errors
          });
        }
        break;
      case 2:
        this.setState({
          currentPage: this.state.currentPage + 1
        });
        break;
      default:
        break;
    }
  }

  finishBtnClickHandler = () => {
    // parse value to int at last while submitting
    // check if propertyType is null or not while submitting
    console.log('finish btn clicked');
    console.log(this.props.propertyArea);
    console.log(this.props.propertyType);
    console.log(this.props.guestCapacity);
    console.log(this.props.rooms);
    console.log(this.props.beds);
    console.log(this.props.amenities);
    console.log(this.props.facilities);
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
        imageSVG = townSVG;
        break;
      case 2:
        Page = <Page2 />;
        imageSVG = choosingHouseSVG;
        break;
      case 3:
        Page = <Page3 />;
        imageSVG = smartHomeSVG;
        break;
      default:
        break;
    }
    
    return (
      <div className={styles.container}>
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
              <img src={imageSVG} className={styles.svgImg} alt="town.svg" />
            </Grid>
          </Hidden>
        </FormGridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    propertyArea: state.host.propertyArea,
    propertyType: state.host.propertyType,
    guestCapacity: state.host.guestCapacity,
    rooms: state.host.rooms,
    beds: state.host.beds,
    amenities: state.host.amenities,
    facilities: state.host.facilities
  }
}

export default connect(mapStateToProps)(Step1);
