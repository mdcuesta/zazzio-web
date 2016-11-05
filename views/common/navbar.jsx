import React from 'react';
import AuthenticatedButtons from './right-authenticated-buttons';
import UnAuthenticatedButtons from './right-unauthenticated-buttons';
import Url from '../helpers/url-helper';
import ResourceHelper from '../helpers/resource-helper';

/**
 * NavBar
 */
export default function NavBar(props) {
  const RES_NAVBAR = ResourceHelper.getResource('navbar', props.locale);

  let navbarClass = 'navbar navbar-fixed-top navbar-main';
  if (!props.fixedTop) {
    navbarClass = 'navbar navbar-main';
  }
  const navBarRightContent = props.authenticated
    ? (<AuthenticatedButtons user={props.user} locale={props.locale} />)
    : (<UnAuthenticatedButtons locale={props.locale} />);

  return (
    <nav
      className={navbarClass}
      data-options="marginTop:0;"
      role="navigation"
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
          className="nav-item dropdown nav-item-separator hidden-sm-down"
        >
          <a
            className="nav-link"
            href={Url.action('browse')}
            id="link-browse"
          >
            {RES_NAVBAR.browse}
          </a>
          <ul
            className="dropdown-menu"
            role="menu"
          >
            <li>
              <a
                className="dropdown-item"
                href={Url.action('condominiums')}
              >
                Condominiums
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href={Url.action('house-and-lot')}
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
                href={Url.action('property-developers')}
              >
                Property Developers
              </a>
            </li>
          </ul>
        </li>
        <li
          className="nav-item dropdown hidden-sm-down nav-item-separator"
        >
          <a
            className="nav-link"
            href={Url.action('explore')}
            id="link-explore"
          >
            {RES_NAVBAR.areas}
          </a>
          <ul
            className="dropdown-menu"
            role="menu"
          >
            <li>
              <a
                className="dropdown-item"
                href={Url.action('explore/metro-manila')}
              >
                Metro Manila
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href={Url.action('explore/pampanga')}
              >
                Pampanga
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href={Url.action('explore/metro-cebu')}
              >
                Cebu
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href={Url.action('explore/davao')}
              >
                Davao
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <div className="btn-search-xs-container hidden-sm-up">
        <button className="btn btn-search-xs">
          <i className="fa fa-large fa-search" />&nbsp;
          {RES_NAVBAR.search}
        </button>
      </div>
      <div className="search-form search-form-sm hidden-xs-down hidden-md-up">
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-search" />
          </div>
          <input
            type="text"
            className="form-control search-text"
            placeholder={RES_NAVBAR.enterAddress}
          />
        </div>
      </div>
      <div className="search-form search-form-md hidden-sm-down hidden-lg-up">
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-search" />
          </div>
          <input
            type="text"
            className="form-control search-text"
            placeholder={RES_NAVBAR.enterAddress}
          />
        </div>
      </div>
      <div className="search-form search-form-lg hidden-md-down">
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-search" />
          </div>
          <input
            type="text"
            className="form-control search-text"
            placeholder={RES_NAVBAR.enterAddress}
          />
        </div>
      </div>
      {navBarRightContent}
      <ul className="nav navbar-nav navbar-right-sm pull-right">
        <li className="nav-item">
          <button
            className="navbar-toggler menu-toggler hidden-md-up"
            type="button"
            role="button"
            id="btn-mobile-menu"
            aria-expanded="false"
            aria-label="menu"
          >
            &#9776;
          </button>
        </li>
      </ul>
    </nav>
  );
}

NavBar.propTypes = {
  authenticated: React.PropTypes.bool,
  fixedTop: React.PropTypes.bool,
  user: React.PropTypes.object,
  locale: React.PropTypes.string,
};

NavBar.defaultProps = {
  authenticated: false,
  fixedTop: true,
  user: null,
  locale: 'en',
};

