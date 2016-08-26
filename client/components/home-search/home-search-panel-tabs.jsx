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
        <ul className='tabs search-tabs-titles' 
            data-tabs id='search-tabs'>
          {this.props.searchTypes.map((searchType, index) => (
            <HomeSearchPanelTab searchType= {searchType.searchType} 
                                label= {searchType.label} 
                                selectedSearchType={this.props.selectedSearchType} 
                                key={'search-panel-' + searchType.searchType.toLowerCase()} />

          ))}
        </ul>
      </div>
    );
  }
}