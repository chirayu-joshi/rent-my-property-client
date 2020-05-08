import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import HostDashboard from '../HostDashboard/HostDashboard';
import Step1 from './Steps/Step1/Step1';
import Step2 from './Steps/Step2/Step2';
import Step3 from './Steps/Step3/Step3';

class Host extends Component {
  constructor(props) {
    super(props);
    props.onCheckAuth();
  }

  render() {
    if (!this.props.isAuthenticated) {
      // show modal
      return (<h1>Please login</h1>);
    }
    return (
      <div style={{width: '100vw', height: '100vh'}}>
        <Switch>
          <Route path="/host/step1/" component={Step1} />
          <Route path="/host/step2/" component={Step2} />
          <Route path="/host/step3/" component={Step3} />
          <Route component={HostDashboard} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch(actions.checkAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Host);
