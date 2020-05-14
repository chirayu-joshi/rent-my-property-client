import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

class SignOut extends Component {
  render() {
    this.props.clearStore();
    localStorage.clear();
    return (
      <Redirect to="/" />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearStore: () => dispatch(actions.clearStore())
  }
}

export default connect(null, mapDispatchToProps)(SignOut);
