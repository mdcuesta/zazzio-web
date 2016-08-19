'use strict';

import React, {Component} from 'react';
import PropertyTypeDropdown from './property-type-dropdown';
/**
 * HomeSearchForm
 */
export default class HomeSearchForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='home-search-form fade-in'>
        <form method='get' action='/search'>
          <input type='hidden' name='t' value={this.props.searchType.toLowerCase()} />
          <div className='row'>
            <div className='small-12 medium-4 large-3 columns'>
              <PropertyTypeDropdown searchType={this.props.searchType} />
            </div>
            <div className='small-12 medium-6 large-7 large-collapse columns'>
              <label>in
                <input className='search-text' name='q' type='search' placeholder='Enter an address or city.' />
              </label>
            </div>
            <div className='medium-2 large-2 columns'>
              <label>&nbsp;
                <input type='submit' className='medium success expanded button search-button' value='Search' />
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
};