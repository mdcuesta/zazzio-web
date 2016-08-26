'use strict';

import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.toggler';
import React, {Component} from 'react';
import HomeSearchForm from './home-search-form';

export default class HomeSearchPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='small-12 small-centered medium-12 medium-centered large-12 large-centered columns search-tabs-panel-container'>
        <div id='panel-search'>
          <div className='small-12 small-centered medium-12 medium centered large-8 large-centered'>
            <h1 data-toggler 
                id='home-search-heading'>{this.props.heading}</h1>
          </div>
          <div className='small-12 small-centered medium-12 medium centered large-8 large-centered search-form-container'>
            <HomeSearchForm searchType={this.props.selectedSearchType}
                            propertyTypes={this.props.propertyTypes} />
          </div>
        </div>
      </div>
    );
  }
}