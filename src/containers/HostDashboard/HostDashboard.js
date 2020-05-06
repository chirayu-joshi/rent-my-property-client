import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import StepCard from '../../components/StepCard/StepCard';

class HostDashboard extends Component {
  state = {
    steps: [
      {
        step: 1,
        title: 'Start with basics',
        subtitle: 'Beds, bathrooms, amenities and more',
        to: '/host/step1'
      },
      {
        step: 2,
        title: 'Set the scene',
        subtitle: 'Photos, short description, title',
        to: "/host/step2"
      },
      {
        step: 3,
        title: 'Get ready for guests',
        subtitle: 'Price, schedule, rules and more',
        to: "/host/step3"
      }
    ]
  }

  render() {
    let title, subtitle;
    if (this.props.currentStep === 1) {
      title = 'Rent your property in 3 easy steps';
      subtitle = 'First, let\'s get some details about your place';
    } else if (this.props.currentStep === 2) {
      title = 'Great progress, ' + localStorage.getItem('firstName');
      subtitle = 'Now let\'s get some pics and location of your place so you can publush your list';
    } else {
      title = 'Last step!';
      subtitle = 'Let\'s set up your pricing and figure out your hosting calender';
    }
    return (
      <Fragment>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {this.state.steps.map(step => 
          <StepCard
            step={step.step}
            key={step.step}
            currentStep={this.props.currentStep}
            title={step.title}
            subtitle={step.subtitle}
            to={step.to} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentStep: state.host.currentStep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // actions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostDashboard);
