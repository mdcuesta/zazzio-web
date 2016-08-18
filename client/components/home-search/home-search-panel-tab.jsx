'use strict';

import React, {Component} from 'react';

export default class HomeSearchPanelTab extends Component {
  constructor(props) {
    super(props);
    this.setSelectedSearchType = this.setSelectedSearchType.bind(this);
  }

  setSelectedSearchType() {
    this.props.setSelectedSearchType(this.props.searchType);
  }

  render() {
    return (
      <li className={'tabs-title' + (this.props.searchType === this.props.selectedSearchType ? ' is-active' : '')}>
        <a onClick={this.setSelectedSearchType} className='button' id={'tab-' + this.props.searchType}>
          {this.props.label}
        </a>
      </li>
    );
  }
}