import React, { Component } from 'react';
import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.toggler';
import SearchActions from '../../actions/home-search-actions';


export default class HomeSearchPanelTab extends Component {
  constructor(props) {
    super(props);
    this.setSelectedSearchType = this.setSelectedSearchType.bind(this);
  }

  /* global Foundation:false */
  setSelectedSearchType() {
    if (this.props.selectedSearchType !== this.props.searchType) {
      Foundation.Motion.animateIn($('#home-search-heading'), 'fade-in');
    }
    SearchActions.setSelectedSearchType(this.props.searchType);
  }

  render() {
    return (
      <li className={(this.props.searchType === this.props.selectedSearchType ? ' is-active' : '')}>
        <a
          onClick={this.setSelectedSearchType}
          className="button"
          id={`tab-${this.props.searchType}`}
        >
            {this.props.label}
        </a>
      </li>
    );
  }
}

HomeSearchPanelTab.propTypes = {
  selectedSearchType: React.PropTypes.string.isRequired,
  searchType: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};
