import React, { Component, forwardRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

import * as actions from '../../store/actions/index';
import HostDashboard from '../HostDashboard/HostDashboard';
import Step1 from './Steps/Step1/Step1';
import Step2 from './Steps/Step2/Step2';
import Step3 from './Steps/Step3/Step3';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Host extends Component {
  constructor(props) {
    super(props);
    props.onCheckAuth();
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted>
          <DialogTitle>Sign In</DialogTitle>
          <DialogContent>
            <DialogContentText>
              For authenticity and security reasons, please <strong>Sign-In </strong>
              or <strong>Sign-Up</strong> before you continue to host your property.
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ margin: '10px 15px' }}>
            <Button
              color="primary"
              onClick={() => this.props.history.push('/')}>
              Home
            </Button>
            <Button
              color="primary"
              onClick={() => this.props.history.push('/signUp')}>
              Sign Up
            </Button>
            <Button
              color="primary"
              onClick={() => this.props.history.push('/signIn')}>
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
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
