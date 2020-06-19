import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormControl,
  InputLabel,
  Select,
  Hidden,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { Tune } from '@material-ui/icons';

import styles from './Filters.module.css';
import * as actions from '../../store/actions/index';
import RangeSlider from '../../components/RangeSlider/RangeSlider';

class Filters extends Component {
  state = {
    filterDialogOpen: true,
    rangeValue: [20, 60]
  }

  rangeChangeHandler = newValue => {
    this.setState({ rangeValue: newValue });
  }

  render() {
    let marks;
    if (this.props.countryCode) {
      switch (this.props.countryCode) {
        case 'IN':
          marks = [
            { value: 0, label: '<10K' },
            { value: 20, label: '20K' },
            { value: 40, label: '40K' },
            { value: 60, label: '60K' },
            { value: 80, label: '80K' },
            { value: 100, label: '>100K' }
          ];
          break;
        case 'US':
        case 'CA':
        case 'GB':
          marks = [
            { value: 0, label: '<150' },
            { value: 20, label: '200' },
            { value: 40, label: '400' },
            { value: 60, label: '600' },
            { value: 80, label: '800' },
            { value: 100, label: '>1K' }
          ];
          break;
        default:
          break;
      }
    }

    return (
      <div className={styles.filters}>
        {
          // guest capacity
          // propertyType
          // more (optional)
        }
        <Dialog open={this.state.filterDialogOpen} style={{ zIndex: '9999' }} fullWidth={true}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent>
            <p>Price</p>
            <RangeSlider
              change={this.rangeChangeHandler}
              value={this.state.rangeValue}
              marks={marks} />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              style={{ width: '100px' }}
              onClick={() => this.setState({ filterDialogOpen: false })}>
              Discard
              </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '100px' }}>
              Apply
              </Button>
          </DialogActions>
        </Dialog>

        <Button
          size="large"
          startIcon={<Tune />}>
          Filters
          </Button>
        <div>
          <FormControl variant="outlined">
            <InputLabel>Sort by</InputLabel>
            <Select
              native
              label="Sort by"
              onChange={e => this.props.sortPosts(e.target.value)}>
              <option aria-label="None" value="" />
              <option value="price">Price</option>
              <option value="stars">Stars</option>
              <option value="guestCapacity">Guest Capacity</option>
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    countryCode: state.map.countryCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sortPosts: by => dispatch(actions.sortPosts(by))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
