'use strict';

import React, {Component} from 'react';
import HomeSearchForm from './home-search-form';
import HomeSearchPanelTabs from './home-search-panel-tabs';
import HomeSearchPanel from './home-search-panel';
import HomeSearchStore from '../../stores/home-search-store';

/**
 * HomeSearch
 */
export default class HomeSearch extends Component {

  constructor(props) {
    super(props);
    let selectedSearchType = HomeSearchStore.getSelectedSearchType();

    this.state = {
      selectedSearchType: selectedSearchType,
      searchTypes: HomeSearchStore.getSearchTypes()
    };
    
    this.onChange = this.onChange.bind(this);
    HomeSearchStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    HomeSearchStore.removeChangeListener(this.onChange);
  }

  onChange() {
    let selectedSearchType = HomeSearchStore.getSelectedSearchType();
    this.setState({
      selectedSearchType: selectedSearchType,
      searchTypes: HomeSearchStore.getSearchTypes()
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
      <div className={'home-search' + ' home-search-banner-' + this.state.selectedSearchType.searchType.toLowerCase()} 
           id='home-search'>
        <div className='expanded row'>
          <HomeSearchPanelTabs selectedSearchType={this.state.selectedSearchType.searchType}
                               searchTypes={this.state.searchTypes} />
          <HomeSearchPanel heading={this.state.selectedSearchType.heading}
                           selectedSearchType={this.state.selectedSearchType.searchType}
                           propertyTypes={this.state.selectedSearchType.propertyTypes} />
        </div>
        {subLabel}
      </div>
    );
  }
};