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
          <div className='small-12 medium-12 large-12 large-centered columns'>
            <div className='title-bar-left middle'>
              <ul className='menu'>
                <li>
                  <a className='zazzio-logo-link' href="/">
                    <img className='zazzio-logo' src='images/zazzio-logo-small-white.png' alt='zazzio' />
                  </a>
                </li>
                <li><a href="#">Buy</a></li>
                <li><a href="#">Rent</a></li>
                <li><a href="#">Sell</a></li>
              </ul>
            </div>
            <div className='title-bar-right' id='title-bar-right'>
            </div>
          </div>
        </div>
      </div>
    );
  }
};