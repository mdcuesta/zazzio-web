import React from 'react';
import AuthenticatedButtons from './right-authenticated-buttons';
import UnAuthenticatedButtons from './right-unauthenticated-buttons';
import Url from '../../helpers/url-helper';

/**
 * NavBar
 */
export default function NavBar(props) {
  const navBarRightContent = props.authenticated
    ? (<AuthenticatedButtons />)
    : (<UnAuthenticatedButtons />);
  return (
    <nav
      className="navbar navbar-fixed-top navbar-main"
      data-options="marginTop:0;"
    >
      <ul className="nav navbar-nav">
        <li className="nav-item nav-item-separator nav-item-margin-1">
          <a
            className="navbar-brand"
            href={Url.action('')}
          >
            <img
              className="zazzio-logo"
              src={Url.cdn('images/zazzio-logo-small.png')}
              alt="zazzio"
            />
          </a>
        </li>
        <li className="nav-item hidden-sm-down">
          <a
            className="nav-link"
            href="/buy"
          >
            Buy
          </a>
        </li>
        <li className="nav-item hidden-sm-down">
          <a
            className="nav-link"
            href="/rent"
          >
            Rent
          </a>
        </li>
        <li
          className={'nav-item nav-item-separator ' +
          'nav-item-margin-1 nav-item-padding-2 hidden-sm-down'}
        >
          <a
            className="nav-link"
            href="/sell"
          >
            Sell
          </a>
        </li>
      </ul>
      <ul className="nav navbar-nav">
        <li className="nav-item nav-item-search-form">
          <div className="form-inline pull-left search-form">
            <div className="input-group hidden-md-down">
              <div className="input-group-addon">
                <i className="fa fa-search" />
              </div>
              <input
                type="text"
                className="form-control search-text-lg"
                placeholder="Enter an address, city or zip code."
              />
            </div>
            <div className="input-group hidden-sm-down hidden-lg-up">
              <div className="input-group-addon">
                <i className="fa fa-search" />
              </div>
              <input
                type="text"
                className="form-control search-text-md"
                placeholder="Enter an address, city or zip code."
              />
            </div>
          </div>
        </li>
      </ul>
      <div className="search-form search-form-sm hidden-xs-down hidden-md-up">
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-search" />
          </div>
          <input
            type="text"
            className="form-control search-text-sm"
            placeholder="Enter an address, city or zip code."
          />
        </div>
      </div>
      {navBarRightContent}
      <button
        className="navbar-toggler menu-toggler pull-right hidden-md-up"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-menu-collapse"
        aria-controls="navbar-menu-collapse"
        aria-expanded="false"
        aria-label="menu"
      >
        &#9776;
      </button>
      <button
        className="navbar-toggler menu-toggler pull-right hidden-md-up"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-menu-collapse"
        aria-controls="navbar-menu-collapse"
        aria-expanded="false"
        aria-label="menu"
      >
        <i className="fa fa-large fa-cog" />
      </button>
      <div className="btn-search-xs-container">
        <button className="btn btn-search-xs hidden-sm-up">
          <i className="fa fa-large fa-search" />&nbsp;
          Search
        </button>
      </div>
      <div
        className="collapse navbar-menu-collapse"
        id="navbar-menu-collapse"
      >
        <ul className="nav hidden-md-up">
          <li className="nav-item">
            <a
              className="nav-link"
              href="/buy"
            >
              Buy
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/rent"
            >
              Rent
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/sell"
            >
              Sell
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  authenticated: React.PropTypes.bool,
};

NavBar.defaultProps = {
  authenticated: false,
};

