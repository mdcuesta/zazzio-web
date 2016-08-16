'use strict';

import React, {Component} from 'react';

/**
 * HomeSearchForm
 */
export default class HomeSearchForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='home-search-form'>
        <form>
          <div className='row'>
            <div className='small-12 medium-4 large-3 columns'>
              <label>I'm looking to {this.props.searchType} a
                <button type='button' className='z-musturd expanded medium dropdown button search-type'>House and Lot</button>
                {/*<select className='search-type'>
                  <option value='House and Lot'>House and Lot</option>
                  <option value='Condominium'>Condominium</option>
                  <option value='Town House'>Town House</option>
                </select>*/}
              </label>
            </div>
            <div className='small-12 medium-6 large-7 columns'>
              <label>in
                  <input className='search-text fade-in' type='search' placeholder='Enter an address or city.' />
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