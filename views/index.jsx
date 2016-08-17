'use strict';

import React, {Component} from 'react';
import DefaultLayout from './layout';
import NavBar from './components/navbar';

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
                     jsbundle = '/javascripts/index.js'
                     cssbundle = '/stylesheets/index.css'>
        <NavBar />
        <div id='home-search'></div>
        <div id='content'></div>
      </DefaultLayout>
    );
  }
};