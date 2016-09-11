import React from 'react';

export default function HomeSearchPanel(props) {
  return (
    <div
      className={'col-sm-12 col-md-12 ' +
        'col-lg-12 ' +
        'search-tabs-panel-container'}
    >
      <div id="panel-search">
        <div className="col-sm-12 col-md-12 col-lg-10 offset-lg-1">
          <h1
            id="home-search-heading"
            data-toggler
          >
            {props.heading}
          </h1>
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

