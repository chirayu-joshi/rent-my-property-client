import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Hidden } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

import * as actions from '../../../../store/actions/index';
import { Page1, Page2, Page3 } from '.';
import styles from '../Steps.module.css';
import AppBar from '../../../../components/AppBar/AppBar';
import InfoModal from '../../../../components/InfoModal/InfoModal';
import FormGridContainer from '../../../../components/FormGridContainer/FormGridContainer';
import forSaleSVG from '../../../../assets/illustrations/SVGs/for_sale.svg';
import locationPropertiesSVG from '../../../../assets/illustrations/SVGs/location_properties.svg';
import myLocationSVG from '../../../../assets/illustrations/SVGs/my_location.svg';

class Step2 extends Component {
  state = {
    currentPage: 3,
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
        this.setState({ currentPage: this.state.currentPage + 1 });
        break;
      case 2:
        if (this.props.propertyName) {
          errors.requiredFields = ''
          this.setState({ currentPage: this.state.currentPage + 1, errors });
        } else {
          errors.requiredFields = 'Please fill out all required fields correctly. ';
          this.setState({ errors });
        }
        break;
      default:
        break;
    }
  }

  finishBtnClickHandler = () => {
    this.props.nextStep();
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
        imageSVG = forSaleSVG;
        break;
      case 2:
        Page = <Page2 />;
        imageSVG = locationPropertiesSVG;
        break;
      case 3:
        Page = <Page3 />;
        imageSVG = myLocationSVG;
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
          Step 2: Set the scene
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
    propertyName: state.host.propertyName,
    propertyDescription: state.host.propertyDescription
  }
}

const mapDispatchToProps = dispatch => {
  return {
    nextStep: () => dispatch(actions.changeStep())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
