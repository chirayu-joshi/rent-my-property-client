import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl, FormGroup, Switch } from '@material-ui/core';

import * as actions from '../../../../store/actions/index';
import styles from '../Steps.module.css';

class Page2 extends Component {
  state = {
    rules: [
      { label: 'Pets allowed', name: 'pets' },
      { label: 'Smoking allowed', name: 'smoking' },
      { label: 'Suitable for children', name: 'children' },
      { label: 'Events allowed', name: 'events' },
      { label: 'Parties allowed', name: 'party' }
    ],
    languages: [
      { label: 'English', name: 'english' },
      { label: 'Hindi', name: 'hindi' },
      { label: 'French', name: 'french' },
      { label: 'Spanish', name: 'spanish' }
    ]
  }

  rulesSwitchChangeHandler = e => {
    const { name, checked } = e.target;
    if (checked) {
      this.props.addRule(name);
    } else {
      this.props.removeRule(name);
    }
  }

  languagesSwitchChangeHandler = e => {
    const { name, checked } = e.target;
    if (checked) {
      this.props.addLanguage(name);
    } else {
      this.props.removeLanguage(name);
    }
  }

  render() {
    return (
      <div className={styles.page}>

        <h1>Requirements from guest.</h1>
        <p>Guest must agree to all your House Rules before they book.</p>
        <FormControl component="fieldset">
          <FormGroup style={{ marginTop: '5%', paddingLeft: '0' }}>
            {this.state.rules.map(rule =>
              <div className={styles.switchContainer} key={rule.name}>
                <span>{rule.label}</span>
                <Switch
                  name={rule.name}
                  color="primary"
                  onClick={this.rulesSwitchChangeHandler.bind(this)}
                  checked={this.props.rules.indexOf(rule.name) !== -1} />
              </div>
            )}
          </FormGroup>
        </FormControl>

        <h1 style={{marginTop: '10%'}}>Language(s) spoken by your guest.</h1>
        <p>Your guest must know these languages.</p>
        <FormControl component="fieldset" style={{marginBottom: '10%'}}>
          <FormGroup style={{ marginTop: '5%', paddingLeft: '0' }}>
            {this.state.languages.map(language => 
              <div className={styles.switchContainer} key={language.name}>
                <span>{language.label}</span>
                <Switch
                  name={language.name}
                  color="primary"
                  onClick={this.languagesSwitchChangeHandler.bind(this)}
                  checked={this.props.languages.indexOf(language.name) !== -1} />
              </div>  
            )}
          </FormGroup>
        </FormControl>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rules: state.host.rules,
    languages: state.host.languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRule: rule => dispatch(actions.addRule(rule)),
    removeRule: rule => dispatch(actions.removeRule(rule)),
    addLanguage: language => dispatch(actions.addLanguage(language)),
    removeLanguage: language => dispatch(actions.removeLanguage(language))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page2);
