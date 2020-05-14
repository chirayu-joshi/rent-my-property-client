import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import axios from '../../axios';

import * as actions from '../../store/actions/index';
import StepCard from '../../components/StepCard/StepCard';
import InfoModal from '../../components/InfoModal/InfoModal';

class HostDashboard extends Component {
  state = {
    status: '',
    success: '',
    error: '',
    steps: [
      {
        step: 1,
        title: 'Start with basics',
        subtitle: 'Beds, bathrooms, amenities and more',
        to: '/host/step1/'
      },
      {
        step: 2,
        title: 'Set the scene',
        subtitle: 'Photos, short description, title',
        to: "/host/step2/"
      },
      {
        step: 3,
        title: 'Get ready for guests',
        subtitle: 'Price, schedule, rules and more',
        to: "/host/step3/"
      }
    ]
  }

  publishBtnClickHandler = () => {
    this.setState({ status: 'Publishing...' });
    const data = {
      propertyName: this.props.propertyName,
      propertyDescription: this.props.propertyDescription,
      propertyArea: this.props.propertyArea,
      propertyType: this.props.propertyType,
      guestCapacity: this.props.guestCapacity,
      rooms: this.props.rooms,
      beds: this.props.beds,
      amenities: this.props.amenities,
      facilities: this.props.facilities,
      location: this.props.location,
      address: {
        number: this.props.number,
        street: this.props.street,
        city: this.props.city,
        state: this.props.state,
        country: this.props.country
      },
      price: this.props.price,
      schedule: this.props.schedule,
      rules: this.props.rules,
      languages: this.props.languages
    }
    axios.post('/api/host/publish', data)
      .then(res => {
        this.setState({ 
          status: '',
          success: 'Your post published successfully. ',
          error: ''
        });
        setTimeout(() => this.props.history.push('/'), 3000);
      })
      .catch(err => {
        this.setState({ 
          status: '',
          success: '',
          error: 'An error while publishing. '
        });
        setTimeout(() => this.props.history.push('/'), 3000);
      });
  }

  discardBtnClickHandler = () => {
    this.setState({ status: 'Discarding...' });
    this.props.clearStore();
    axios.delete('/api/host/discard')
      .then(res => {
        this.setState({ 
          status: '',
          success: 'Your post discarded successfully. ',
          error: ''
        });
        setTimeout(() => this.props.history.push('/'), 3000);
      })
      .catch(err => {
        this.setState({ 
          status: '',
          success: '',
          error: 'An error while discarding. '
        });
        setTimeout(() => this.props.history.push('/'), 3000);
      });
  }

  render() {
    let title, subtitle;
    if (this.props.currentStep === 1) {
      title = 'Rent your property in 3 easy steps';
      subtitle = 'First, let\'s get some details about your place';
    } else if (this.props.currentStep === 2) {
      title = 'Great progress, ' + localStorage.getItem('firstName');
      subtitle = 'Now let\'s get some pics and location of your place so you can publish your list';
    } else if (this.props.currentStep === 3) {
      title = 'Last step!';
      subtitle = 'Let\'s set up your pricing and figure out your hosting calender';
    } else {
      title = "You're ready to publish!";
      subtitle = "You'll be now able to welcome your first guest after you publish your listing";
    }
    return (
      <Grid container direction="column" alignItems="center">
        <InfoModal 
          loading={this.state.status} 
          type="loading">
          {this.state.status}
        </InfoModal>
        <InfoModal
          loading={this.state.success}
          type="success">
          {this.state.success}
        </InfoModal>
        <InfoModal
          loading={this.state.error}
          type="error">
          {this.state.error}
        </InfoModal>
        <Grid item xs={11} md={6} lg={5} xl={3} style={{ marginTop: '5%' }}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {this.state.steps.map(step =>
            <StepCard
              step={step.step}
              key={step.step}
              currentStep={this.props.currentStep}
              title={step.title}
              subtitle={step.subtitle}
              parentProps={this.props}
              to={step.to} />
          )}
          {this.props.currentStep === 4
            ? <Grid container>
                <Grid item xs={12} md={6} style={{ padding: '5px 7px' }}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{ width: '100%' }}
                    onClick={this.publishBtnClickHandler}>
                    Publish listing
                  </Button>
                  </Grid>
                  <Grid item xs={12} md={6} style={{ padding: '5px 7px' }}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      style={{ width: '100%' }}
                      onClick={this.discardBtnClickHandler}>
                      Discard changes
                  </Button>
                </Grid>
              </Grid>
            : null
          }
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentStep: state.host.currentStep,
    propertyArea: state.host.propertyArea,
    propertyType: state.host.propertyType,
    guestCapacity: state.host.guestCapacity,
    rooms: state.host.rooms,
    beds: state.host.beds,
    amenities: state.host.amenities,
    facilities: state.host.facilities,
    propertyName: state.host.propertyName,
    propertyDescription: state.host.propertyDescription,
    location: state.host.location,
    country: state.host.country,
    state: state.host.state,
    city: state.host.city,
    street: state.host.street,
    number: state.host.number,
    price: state.host.price,
    schedule: state.host.schedule,
    rules: state.host.rules,
    languages: state.host.languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearStore: () => dispatch(actions.clearStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostDashboard);
