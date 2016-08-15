'use strict';

import React, {Component} from 'react';
import HomeSearchForm from './home-search-form';

/**
 * HomeSearch
 */
export default class HomeSearch extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const tabPanelsTitles =
      (
        <div className='small-12 small-centered medium-12 medium-centered large-10 large-centered columns'>
          <ul className='tabs search-tabs-titles' data-tabs id='search-tabs'>
            <li className='tabs-title is-active'>
              <a href='#panelBuy' className='button' aria-selected='true'>Buy</a>
            </li>
            <li className='tabs-title'>
              <a href='#panelRent' className='button'>Rent</a>
            </li>
            <li className='tabs-title'>
              <a href='#panelSell' className='button'>Sell</a>
            </li>
          </ul>
        </div>
      );

    const tabPanels =
      (
        <div className='small-12 small-centered medium-12 medium-centered large-12 large-centered columns search-tabs-panel-container'>
          <div className='tabs-content' data-tabs-content='search-tabs'>
            <div className="tabs-panel is-active" id="panelBuy">
              <div className='large-10 large-centered'>
                <h1>Your dream home awaits.</h1>
              </div>
              <div className='large-10 large-centered search-form-container'>
                <HomeSearchForm searchType='Buy' />
              </div>
            </div>
            <div className="tabs-panel" id="panelRent">
              <div className='large-10 large-centered'>
                <h1>Get to your next rental.</h1>
              </div>
              <div className='large-10 large-centered search-form-container'>
                <HomeSearchForm searchType='Rent' />
              </div>
            </div>
            <div className="tabs-panel" id="panelSell">   
              <div className='large-10 large-centered'>
                <h1>&nbsp;</h1>
              </div> 
              <div className='large-10 large-centered search-form-container'>                  
              </div>
            </div>
          </div>
        </div>
      );

    const subLabel = 
      (
        <div className='title-bar nav-bar search-form-sub-label'>
          <div className='title-bar-left'>&nbsp;</div>
          <div className='title-bar-right'></div>
        </div>
      );

    return(
      <div className='home-search' id='home-search'>
        <div className='expanded row'>
          {tabPanelsTitles}
          {tabPanels}
        </div>
        {subLabel}
      </div>
    );
  }
};