'use strict';

import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.toggler';
import React, {Component} from 'react';


export default class HomeSearchPanelTab extends Component {
  constructor(props) {
    super(props);
    this.setSelectedSearchType = this.setSelectedSearchType.bind(this);
  }

  setSelectedSearchType() {
    if(this.props.selectedSearchType !== this.props.searchType) {
      Foundation.Motion.animateIn($('#home-search-heading'), 'fade-in');
    }
    this.props.setSelectedSearchType(this.props.searchType);
  }

  render() {
    return (
      <li className={(this.props.searchType === this.props.selectedSearchType ? ' is-active' : '')}>
        <a onClick={this.setSelectedSearchType} 
           className='button' 
           id={'tab-' + this.props.searchType}>
            {this.props.label}
        </a>
      </li>
    );
  }
}