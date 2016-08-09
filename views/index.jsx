'use strict';

import React, {Component} from 'react';
import DefaultLayout from './layout';

/**
 * Index View
 */
export default class Index extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <DefaultLayout title={this.props.title} 
                     cssbundle="/stylesheets/style.css"
                     jsbundle="/javascripts/main.js">
        <div id="content">
        </div>
      </DefaultLayout>
    );
  }
};