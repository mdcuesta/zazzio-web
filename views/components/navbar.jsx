import React from 'react';

/**
 * NavBar
 */
export default function NavBar() {
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
          <div
            className="title-bar-right"
            id="title-bar-right"
          >
            <a
              href="/login"
              type="button"
              className="button"
            >
              Log In
            </a>
            <a
              href="/register"
              type="button"
              className="z-musturd button hollow"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
