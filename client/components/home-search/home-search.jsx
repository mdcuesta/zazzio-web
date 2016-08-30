import React, { Component } from 'react';
import HomeSearchPanelTabs from './home-search-panel-tabs';
import HomeSearchPanel from './home-search-panel';
import HomeSearchStore from '../../stores/home-search-store';

/**
 * HomeSearch
 */
export default class HomeSearch extends Component {

  constructor(props) {
    super(props);
    const selectedSearchType = HomeSearchStore.getSelectedSearchType();

    this.state = {
      selectedSearchType,
      searchTypes: HomeSearchStore.getSearchTypes(),
    };

    this.onChange = this.onChange.bind(this);
    HomeSearchStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    HomeSearchStore.removeChangeListener(this.onChange);
  }

  onChange() {
    const selectedSearchType = HomeSearchStore.getSelectedSearchType();
    this.setState({
      selectedSearchType,
      searchTypes: HomeSearchStore.getSearchTypes(),
    });
  }

  render() {
    const subLabel =
    (
      <div className="title-bar nav-bar search-form-sub-label">
        <div className="title-bar-left">&nbsp;</div>
        <div className="title-bar-right" />
      </div>
    );

    const searchBannerClass =
      `home-search home-search-banner-${this.state.selectedSearchType.searchType.toLowerCase()}`;
    return (
      <div
        className={searchBannerClass}
        id="home-search"
      >
        <div className="expanded row">
          <HomeSearchPanelTabs
            selectedSearchType={this.state.selectedSearchType.searchType}
            searchTypes={this.state.searchTypes}
          />
          <HomeSearchPanel
            heading={this.state.selectedSearchType.heading}
            selectedSearchType={this.state.selectedSearchType.searchType}
            propertyTypes={this.state.selectedSearchType.propertyTypes}
          />
        </div>
        {subLabel}
      </div>
    );
  }
}
