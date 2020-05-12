import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, FormControl, TextField, FormHelperText } from '@material-ui/core';

import * as actions from '../../../../store/actions/index';
import styles from '../Steps.module.css';

class Page2 extends Component {
  render() {
    return (
      <div className={styles}>

        <h1>Name Your Place</h1>
        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>
            <FormControl required style={{marginTop: '10px', width: '100%'}}>
              <TextField
                label="Listing title *"
                onChange={e => this.props.onInputChange(e.target.value)}
                value={this.props.propertyName} />
              <FormHelperText>Please add a name of you property.</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <h1 style={{ marginTop: '12%' }}>Edit your description</h1>
        <Grid container>
          <Grid item xs={12} sm={9} xl={7}>
            <TextField
              label="Summary"
              multiline
              rows={4}
              style={{marginTop: '5px', width: '100%'}}
              onChange={e => this.props.onTextAreaChange(e.target.value)}
              value={this.props.propertyDescription} />
          </Grid>
        </Grid>

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
    onInputChange: input => dispatch(actions.changePropertyName(input)),
    onTextAreaChange: input => dispatch(actions.changePropertyDesc(input))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page2);
