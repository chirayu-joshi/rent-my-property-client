import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

import styles from './Navbar.module.css';
import * as actions from '../../store/actions/index';

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navLinksOpen: false
    }
    this.props.checkAuth();
  }

  hamburgerClickHandler = () => {
    this.setState(prevState => ({
      navLinksOpen: !prevState.navLinksOpen
    }));
  }

  render() {
    return (
      <nav className={styles.nav}>
        <div
          className={styles.hamburger}
          onClick={() => this.hamburgerClickHandler()}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={this.state.navLinksOpen ? styles.navLinksOpen : styles.navLinks}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/host">Host</NavLink></li>
          <li><NavLink to="/chat">Chats</NavLink></li>
        </ul>
        <h2 className={styles.title}>Rent My Property</h2>
        <div className={styles.buttons}>
          <ThemeProvider theme={theme}>
            {this.props.isAuthenticated
              ? <Button
                  variant="contained"
                  color="primary"
                  style={{ color: 'white', width: '100px' }}
                  onClick={() => this.props.history.push('/signOut')}>
                  Logout
                </Button>
              : <Fragment>
                  <Button
                    color="primary"
                    style={{ width: '100px' }}
                    onClick={() => this.props.history.push('/signUp')}>
                    Sign up
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ color: 'white', width: '100px' }}
                    onClick={() => this.props.history.push('/signIn')}>
                    Login
                  </Button>
                </Fragment>
            }
          </ThemeProvider>
        </div>
      </nav>
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
    checkAuth: () => dispatch(actions.checkAuth())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
