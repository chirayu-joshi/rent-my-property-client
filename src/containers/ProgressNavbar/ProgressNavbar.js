import React, { Component } from 'react';

class ProgressNavbar extends Component {
  render() {
    return (
      <h1>{this.props.children}</h1>
    );
  }
}

export default ProgressNavbar;