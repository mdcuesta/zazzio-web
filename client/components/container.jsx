'use strict';

import React, {Component} from 'react';

/**
 * Main Container Component
 */
export default class Container extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}