import React from 'react';
import HomeSearchPanelTab from './home-search-panel-tab';

export default function HomeSearchPanelTabs(props) {
  return (
    <div
      className={'small-12 small-centered medium-12 '
      + 'medium-centered large-8 large-centered columns'}
    >
      <ul
        className="tabs search-tabs-titles"
        data-tabs id="search-tabs"
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
