import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Grid, Button, Hidden } from '@material-ui/core';

import styles from './Navbar.module.css';
import logoText from '../../assets/logo/logo_text.png';
import * as actions from '../../store/actions/index';

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

  closeNav = () => this.setState({ navLinksOpen: false });

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
        <Grid container>
          <Grid item xs={12} lg={6}>
            <ul className={this.state.navLinksOpen ? styles.navLinksOpen : styles.navLinks}>
              <li onClick={this.closeNav}><NavLink to="/">Home</NavLink></li>
              <li onClick={this.closeNav}><NavLink to="/host">Host</NavLink></li>
              <li onClick={this.closeNav}><NavLink to="/chat">Chats</NavLink></li>
              <Hidden smUp>
                <li><NavLink to="/signUp">Sign up</NavLink></li>
                <li><NavLink to="/signIn">Login</NavLink></li>
              </Hidden>
            </ul>
          </Grid>
        </Grid>
        <img src={logoText} alt="logo text" className={styles.logoText} />
        <Hidden xsDown>
          <div className={styles.buttons}>
            {this.props.isAuthenticated
              ? <Button
                variant="contained"
                style={{ color: 'white', width: '100px', backgroundColor: '#46B174' }}
                onClick={() => this.props.history.push('/signOut')}>
                Logout
                </Button>
              : <Fragment>
                <Button
                  style={{ color: '#46B174', width: '100px' }}
                  onClick={() => this.props.history.push('/signUp')}>
                  Sign up
                  </Button>
                <Button
                  variant="contained"
                  style={{ color: 'white', width: '100px', backgroundColor: '#46B174' }}
                  onClick={() => this.props.history.push('/signIn')}>
                  Login
                  </Button>
              </Fragment>
            }
          </div>
        </Hidden>
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
