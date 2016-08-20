'use strict';

import React, {Component} from 'react';
import DefaultLayout from './layout';

/**
 * Error View
 */
export default class Error extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <DefaultLayout title='Error'>
        <h1 className='error-message'>{this.props.message}</h1>
        <h2 className='error-status'>{this.props.error.status}</h2>
        <pre className='error-stack'>
          {this.props.error.stack}
        </pre>
      </DefaultLayout>
    );
  }
};