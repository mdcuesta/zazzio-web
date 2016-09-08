import React from 'react';
import AuthenticatedButtons from './right-authenticated-buttons';
import UnAuthenticatedButtons from './right-unauthenticated-buttons';

/**
 * NavBar
 */
export default function NavBar(props) {
  const navBarRightContent = props.authenticated
    ? (<AuthenticatedButtons />)
    : (<UnAuthenticatedButtons />);
  return (
    <div data-sticky-container>
      <div
        className="z-dark-blue title-bar nav-bar nav-bar-main"
        data-options="marginTop:0;"
      >
        <div className="small-12 medium-12 large-12 large-centered columns">
          <div className="title-bar-left middle">
            <ul className="menu">
              <li>
                <a
                  className="zazzio-logo-link"
                  href="/"
                >
                  <img
                    className="zazzio-logo"
                    src="images/zazzio-logo-small-white.png"
                    alt="zazzio"
                  />
                </a>
              </li>
              <li><a href="/buy">Buy</a></li>
              <li><a href="/rent">Rent</a></li>
              <li><a href="/sell">Sell</a></li>
            </ul>
          </div>
          {navBarRightContent}
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  authenticated: React.PropTypes.bool,
};

NavBar.defaultProps = {
  authenticated: false,
};

