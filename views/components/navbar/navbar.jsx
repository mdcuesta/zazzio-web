import React from 'react';
import AuthenticatedButtons from './right-authenticated-buttons';
import UnAuthenticatedButtons from './right-unauthenticated-buttons';
import CDN from '../../../utilities/cdn';

/**
 * NavBar
 */
export default function NavBar(props) {
  const navBarRightContent = props.authenticated
    ? (<AuthenticatedButtons />)
    : (<UnAuthenticatedButtons />);
  return (
    <nav
      className="navbar navbar-main"
      data-options="marginTop:0;"
    >
      <a className="navbar-brand" href="/">
        <img
          className="zazzio-logo"
          src={CDN.url('images/zazzio-logo-small-white.png')}
          alt="zazzio"
        />
      </a>
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/buy">Buy</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/rent">Rent</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/sell">Sell</a>
        </li>
      </ul>
      {navBarRightContent}
    </nav>
  );
}

NavBar.propTypes = {
  authenticated: React.PropTypes.bool,
};

NavBar.defaultProps = {
  authenticated: false,
};

