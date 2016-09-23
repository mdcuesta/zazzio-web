import React from 'react';
import AuthenticatedButtons from './right-authenticated-buttons';
import UnAuthenticatedButtons from './right-unauthenticated-buttons';
import Url from '../helpers/url-helper';

/**
 * NavBar
 */
export default function NavBar(props) {
  let navbarClass = 'navbar navbar-fixed-top navbar-main';
  if (!props.fixedTop) {
    navbarClass = 'navbar navbar-main';
  }
  const navBarRightContent = props.authenticated
    ? (<AuthenticatedButtons user={props.user} />)
    : (<UnAuthenticatedButtons />);
  return (
    <nav
      className={navbarClass}
      data-options="marginTop:0;"
    >
      <a
        className="navbar-brand"
        href={Url.action('')}
      >
        <img
          className="zazzio-logo"
          src={Url.cdn('images/zazzio-logo-transparent.png')}
          alt="zazzio"
        />
      </a>
      <ul className="nav navbar-nav">
        <li
          className="nav-item dropdown hidden-sm-down"
        >
          <a
            className="nav-link dropdown-toggle"
            href={Url.action('browse')}
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Browse
          </a>
          <ul
            className="dropdown-menu"
            role="menu"
          >
            <li>
              <a
                className="dropdown-item"
                href="/condominiums"
              >
                Condominiums
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="/house-and-lot"
              >
                House and Lot
              </a>
            </li>
            <li>
              <div className="dropdown-divider" />
            </li>
            <li>
              <a
                className="dropdown-item"
                href="/developers"
              >
                Real Estate Developers
              </a>
            </li>
          </ul>
        </li>
        <li
          className="nav-item dropdown hidden-sm-down nav-item-separator"
        >
          <a
            className="nav-link dropdown-toggle"
            href={Url.action('explore')}
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Areas
          </a>
          <ul
            className="dropdown-menu"
            role="menu"
          >
            <li>
              <a
                className="dropdown-item"
                href="/condominiums"
              >
                Metro Manila
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="/house-and-lot"
              >
                Pampanga
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="/developers"
              >
                Cebu
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="/developers"
              >
                Davao
              </a>
            </li>
          </ul>
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
                placeholder="Enter an address or city."
              />
            </div>
            <div className="input-group hidden-sm-down hidden-lg-up">
              <div className="input-group-addon">
                <i className="fa fa-search" />
              </div>
              <input
                type="text"
                className="form-control search-text-md"
                placeholder="Enter an address or city."
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
            placeholder="Enter an address or city."
          />
        </div>
      </div>
      {navBarRightContent}
      <ul className="nav navbar-nav navbar-right-sm pull-right">
        <li className="nav-item">
          <button
            className="navbar-toggler menu-toggler hidden-md-up"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-menu-collapse"
            aria-controls="navbar-menu-collapse"
            aria-expanded="false"
            aria-label="menu"
          >
            <i className="fa fa-large fa-cog" />
          </button>
        </li>
        <li className="nav-item">
          <button
            className="navbar-toggler menu-toggler hidden-md-up"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-menu-collapse"
            aria-controls="navbar-menu-collapse"
            aria-expanded="false"
            aria-label="menu"
          >
            &#9776;
          </button>
        </li>
      </ul>
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
              href={Url.action('buy')}
            >
              Buy
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href={Url.action('rent')}
            >
              Rent
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href={Url.action('sell')}
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
  fixedTop: React.PropTypes.bool,
  user: React.PropTypes.object,
};

NavBar.defaultProps = {
  authenticated: false,
  fixedTop: true,
  user: null,
};

