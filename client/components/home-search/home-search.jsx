import React, { Component } from 'react';
import HomeSearchPanelTabs from './home-search-panel-tabs';
import HomeSearchPanel from './home-search-panel';
import Store from '../../stores/home-search-store';

/**
 * HomeSearch
 */
export default class HomeSearch extends Component {

  constructor(props) {
    super(props);
    const selectedSearchType = Store.getSelectedSearchType();

    this.state = {
      selectedSearchType,
      searchTypes: Store.getSearchTypes(),
    };

    this.onChange = this.onChange.bind(this);
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    const selectedSearchType = Store.getSelectedSearchType();
    this.setState({
      selectedSearchType,
      searchTypes: Store.getSearchTypes(),
    });
  }

  render() {
    const searchBannerClass =
      'home-search animated fadeIn ' +
      `home-search-banner-${this.state.selectedSearchType.searchType.toLowerCase()}`;
    return (
      <div
        className={searchBannerClass}
        id="home-search"
      >
        <div className="container-fluid">
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
      </div>
    );
  }
}
