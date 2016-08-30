import React from 'react';
import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.toggler';
import HomeSearchForm from './home-search-form';

export default function HomeSearchPanel(props) {
  return (
    <div
      className={'small-12 small-centered medium-12 ' +
        'medium-centered large-12 large-centered columns ' +
        'search-tabs-panel-container'}
    >
      <div id="panel-search">
        <div className="small-12 small-centered medium-12 medium centered large-8 large-centered">
          <h1
            id="home-search-heading"
            data-toggler
          >
            {props.heading}
          </h1>
        </div>
        <div
          className={'small-12 small-centered medium-12 ' +
          'medium centered large-8 large-centered ' +
          'search-form-container'}
        >
          <HomeSearchForm
            searchType={props.selectedSearchType}
            propertyTypes={props.propertyTypes}
          />
        </div>
      </div>
    </div>
  );
}

HomeSearchPanel.propTypes = {
  heading: React.PropTypes.string.isRequired,
  selectedSearchType: React.PropTypes.string.isRequired,
  propertyTypes: React.PropTypes.array.isRequired,
};

