'use strict';

import React, {Component} from 'react';
import HomeSearchPanelTab from './home-search-panel-tab';

export default class HomeSearchPanelTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='small-12 small-centered medium-12 medium-centered large-8 large-centered columns'>
        <ul className='tabs search-tabs-titles' data-tabs id='search-tabs'>
          <HomeSearchPanelTab searchType='Buy' 
                              label='Buy' 
                              selectedSearchType={this.props.selectedSearchType} 
                              setSelectedSearchType={this.props.setSelectedSearchType} />
          <HomeSearchPanelTab searchType='Rent' 
                              label='Rent' 
                              selectedSearchType={this.props.selectedSearchType} 
                              setSelectedSearchType={this.props.setSelectedSearchType} />
          <HomeSearchPanelTab searchType='Sell' 
                              label='Sell' 
                              selectedSearchType={this.props.selectedSearchType}
                              setSelectedSearchType={this.props.setSelectedSearchType} />
        </ul>
      </div>
    );
  }
}