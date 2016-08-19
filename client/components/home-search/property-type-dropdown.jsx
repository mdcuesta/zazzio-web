'use strict';

import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.dropdown';
import React, {Component} from 'react';

/**
 * Search Type Dropdown
 */
export default class PropertyTypeDropdown extends Component {
  constructor(props) {
    super(props);
    this.radioSearchTypeClick = this.radioSearchTypeClick.bind(this);
    this.state = {
      propertySearchType: 'House and Lot'
    }
  }

  radioSearchTypeClick(searchType) {
    $('#property-type-dropdown-pane').foundation('close');
    this.setState({
      propertySearchType: searchType
    });
  }

  render() {
    const propertyTypes = ['House and Lot', 'Condominium', 'Townhouse'];

    return(      
      <label className='property-type-label'>I'm looking to {this.props.searchType} a
        <button type='button' 
                className='z-musturd expanded medium dropdown button search-type'
                data-toggle='property-type-dropdown-pane'
                onClick={this.dropdownClick}>
          {this.state.propertySearchType}
        </button>
        <div className='dropdown-pane'
             id='property-type-dropdown-pane' 
             data-dropdown data-close-on-click='true'>
          <ul>
            {propertyTypes.map((name, index) => (
              <li key={name}>
                <label className={'expanded z-musturd button' + (this.state.propertySearchType === name ? ' is-selected' : '')}
                       onClick={() => this.radioSearchTypeClick(name)}>
                         <input name='p' 
                                type='radio' 
                                value={name.toLowerCase()} 
                                defaultChecked={this.state.propertySearchType === name} />{name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </label>
    );
  }
};

