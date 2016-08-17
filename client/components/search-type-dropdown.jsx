'use strict';

import React, {Component} from 'react';

/**
 * Search Type Dropdown
 */
export default class SearchTypeDropdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <label>I'm looking to {this.props.searchType} a
        <button type='button' className='z-musturd expanded medium dropdown button search-type'>House and Lot</button>
      </label>
    );
  }
};

