import React from 'react';
import PropertyTypeDropdown from './property-type-dropdown';

/**
 * HomeSearchForm
 */
export default function HomeSearchForm(props) {
  return (
    <div className="home-search-form fade-in">
      <form
        method="get"
        action="/search"
      >
        <input
          type="hidden"
          name="t"
          value={props.searchType.toLowerCase()}
        />
        <div className="row">
          <div className="small-12 medium-4 large-3 columns">
            <PropertyTypeDropdown
              searchType={props.searchType}
              propertyTypes={props.propertyTypes}
            />
          </div>
          <div className="small-12 medium-6 large-7 large-collapse columns">
            <label htmlFor="text-address">in
              <input
                id="text-address"
                className="search-text"
                name="q"
                type="search"
                placeholder="Enter an address or city."
              />
            </label>
          </div>
          <div className="medium-2 large-2 columns">
            <label htmlFor="btn-search-submit">&nbsp;
              <input
                id="btn-search-submit"
                type="submit"
                className="medium success expanded button search-button"
                value="Search"
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

HomeSearchForm.propTypes = {
  searchType: React.PropTypes.string.isRequired,
  propertyTypes: React.PropTypes.array.isRequired,
};
