import React from 'react';
import HomeSearchPanelTab from './home-search-panel-tab';

export default function HomeSearchPanelTabs(props) {
  return (
    <div
      className="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-lg-1"
    >
      <ul
        className="nav search-tabs"
        id="search-tabs"
        role="tablist"
      >
        {props.searchTypes.map((searchType) => (
          <HomeSearchPanelTab
            searchType={searchType.searchType}
            label={searchType.label}
            selectedSearchType={props.selectedSearchType}
            key={`search-panel${searchType.searchType.toLowerCase()}`}
          />
        ))}
      </ul>
    </div>
  );
}

HomeSearchPanelTabs.propTypes = {
  searchTypes: React.PropTypes.array.isRequired,
  selectedSearchType: React.PropTypes.string.isRequired,
};
