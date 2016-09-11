import React, { Component } from 'react';
import SearchActions from '../../actions/home-search-actions';


export default class HomeSearchPanelTab extends Component {
  constructor(props) {
    super(props);
    this.setSelectedSearchType = this.setSelectedSearchType.bind(this);
  }

  setSelectedSearchType() {
    if (this.props.selectedSearchType !== this.props.searchType) {
      $('#home-search-heading').animateCss('fadeIn');
    }
    SearchActions.setSelectedSearchType(this.props.searchType);
  }

  render() {
    const linkClass = 'search-tab ' +
    `nav-item${(this.props.searchType === this.props.selectedSearchType ? ' active' : '')}`;
    return (
      <li
        className={linkClass}
        role="tab"
        aria-selected={this.props.searchType === this.props.selectedSearchType}
      >
        <a
          id={`tab-${this.props.searchType}`}
          onClick={this.setSelectedSearchType}
          role="button"
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
