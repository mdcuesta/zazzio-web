'use strict';

import React, {Component} from 'react';

/**
 * NavBar
 */
export default class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div data-sticky-container>
        <div className='z-dark-blue title-bar nav-bar nav-bar-main' 
             data-options='marginTop:0;'>
          <div className='small-12 medium-12 large-11 large-centered columns'>
            <div className='title-bar-left middle'>
              <ul className='menu'>
                <li><a href="#">Buy</a></li>
                <li><a href="#">Rent</a></li>
                <li><a href="#">Sell</a></li>
              </ul>
            </div>
            <div className='title-bar-right'>
              <button type='button' className='button'>Login</button>
              <button type='button' className='z-musturd button hollow'>Register</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};