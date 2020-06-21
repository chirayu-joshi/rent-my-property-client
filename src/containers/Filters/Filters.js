import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@material-ui/core';
import {
  Tune,
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined
} from '@material-ui/icons';

import styles from './Filters.module.css';
import * as actions from '../../store/actions/index';
import RangeSlider from '../../components/RangeSlider/RangeSlider';

class Filters extends Component {
  state = {
    filterDialogOpen: false,
    rangeValue: [20, 60],
    guestCapacity: 3,
    propertyType: ''
  }

  rangeChangeHandler = newValue => {
    this.setState({ rangeValue: newValue });
  }

  guestCapacityAddHandler = () => {
    this.setState(prevState => ({
      guestCapacity: prevState.guestCapacity + 1
    }));
  }

  guestCapacitySubtractHandler = () => {
    if (this.state.guestCapacity > 1) {
      this.setState(prevState => ({
        guestCapacity: prevState.guestCapacity - 1
      }));
    }
  }

  applyFilters = () => {
    this.props.filterPosts({
      rangeValue: this.state.rangeValue,
      guestCapacity: this.state.guestCapacity,
      propertyType: this.state.propertyType
    });
    this.setState({ filterDialogOpen: false });
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

        <Dialog
          open={this.state.filterDialogOpen}
          style={{ zIndex: '9999' }}
          fullWidth={true}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent style={{ overflow: 'hidden' }}>
            <p>Price</p>
            <RangeSlider
              change={this.rangeChangeHandler}
              value={this.state.rangeValue}
              marks={marks} />
            <div className={styles.counter}>
              <p style={{ marginTop: '10px' }}>Guest Capacity</p>
              <div>
                {this.state.guestCapacity <= 1 ?
                  <IconButton disabled>
                    <RemoveCircleOutlineOutlined fontSize="large" />
                  </IconButton> :
                  <IconButton
                    color="primary"
                    onClick={() => this.guestCapacitySubtractHandler()}>
                    <RemoveCircleOutlineOutlined fontSize="large" />
                  </IconButton>
                }
                <span>{this.state.guestCapacity}</span>
                <IconButton
                  color="primary"
                  onClick={() => this.guestCapacityAddHandler()}>
                  <AddCircleOutlineOutlined fontSize="large" />
                </IconButton>
              </div>
            </div>
            <FormControl style={{ width: '100%' }}>
              <InputLabel>Property type</InputLabel>
              <Select
                native
                onChange={e => this.setState({ propertyType: e.target.value })}
                value={this.props.propertyType}>
                <option value="" />
                <option value="house">House</option>
                <option value="flat">Flat</option>
                <option value="hotel">Hotel</option>
                <option value="bungalow">Bungalow</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
              </Select>
            </FormControl>
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
              style={{ width: '100px' }}
              onClick={() => this.applyFilters()}>
              Apply
              </Button>
          </DialogActions>
        </Dialog>

        <Button
          size="large"
          startIcon={<Tune />}
          onClick={() => this.setState({ filterDialogOpen: true })}>
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
    sortPosts: by => dispatch(actions.sortPosts(by)),
    filterPosts: filters => dispatch(actions.filterPosts(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
