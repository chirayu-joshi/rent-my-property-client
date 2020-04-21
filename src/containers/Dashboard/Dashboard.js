import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Link to="/signIn">Sign In</Link>
        <Link to="/signUp">Sign Up</Link>
      </Fragment>
    );
  }
}

export default Dashboard;
