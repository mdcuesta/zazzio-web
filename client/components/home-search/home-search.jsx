'use strict';

import React, {Component} from 'react';
import HomeSearchForm from './home-search-form';
import HomeSearchPanelTabs from './home-search-panel-tabs';
import HomeSearchPanel from './home-search-panel';

const BUY_HEADING = 'Your dream home awaits.';
const RENT_HEADING = 'Get to your next rental';
const SELL_HEADING = 'Your next profit is a step away.';
/**
 * HomeSearch
 */
export default class HomeSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSearchType: 'Buy',
      selectedPropertyType: 'House and Lot',
      heading: BUY_HEADING
    };
    this.setSelectedSearchType = this.setSelectedSearchType.bind(this);
  }

  setSelectedSearchType(searchType) {
    let heading = BUY_HEADING;
    switch(searchType) {
      case 'Rent':
        heading = RENT_HEADING;
        break;
      case 'Sell':
        heading = SELL_HEADING;
        break;
      case 'Buy':
      default:
        heading = BUY_HEADING;
    }
    this.setState({
      selectedSearchType: searchType,
      heading: heading  
    });
  }

  render() {

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
          <HomeSearchPanelTabs selectedSearchType={this.state.selectedSearchType} 
                               setSelectedSearchType={this.setSelectedSearchType} />
          <HomeSearchPanel heading={this.state.heading}
                           selectedSearchType={this.state.selectedSearchType} />
        </div>
        {subLabel}
      </div>
    );
  }
};