import React, { Component } from 'react';
import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.dropdown';

/**
 * Search Type Dropdown
 */
export default class PropertyTypeDropdown extends Component {
  constructor(props) {
    super(props);
    this.radioSearchTypeClick = this.radioSearchTypeClick.bind(this);
    this.state = {
      propertySearchType: 'House and Lot',
    };
  }

  radioSearchTypeClick(searchType) {
    $('#property-type-dropdown-pane').foundation('close');
    this.setState({
      propertySearchType: searchType,
    });
  }

  render() {
    return (
      <label
        className="property-type-label"
        htmlFor="btn-property-type"
      >I'm looking to {this.props.searchType} a
        <button
          id="btn-property-type"
          type="button"
          className="z-musturd expanded medium dropdown button search-type"
          data-toggle="property-type-dropdown-pane"
          onClick={this.dropdownClick}
        >
          {this.state.propertySearchType}
        </button>
        <div
          className="dropdown-pane"
          id="property-type-dropdown-pane"
          data-dropdown data-close-on-click
        >
          <ul>
            {this.props.propertyTypes.map((name) => (
              <li key={name}>
                <label
                  htmlFor="radio-property-type"
                  className={`expanded z-musturd button${this.state.propertySearchType === name
                    ? ' is-selected' : ''}`}
                  onClick={() => this.radioSearchTypeClick(name)}
                >
                  <input
                    name="p"
                    type="radio"
                    value={name.toLowerCase()}
                    defaultChecked={this.state.propertySearchType === name}
                  />
                    {name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </label>
    );
  }
}


PropertyTypeDropdown.propTypes = {
  searchType: React.PropTypes.string.isRequired,
  propertyTypes: React.PropTypes.array.isRequired,
};
