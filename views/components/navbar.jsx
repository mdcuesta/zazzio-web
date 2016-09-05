import React from 'react';

/**
 * NavBar
 */
export default function NavBar(props) {
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
          <NavBarRight isUserAuthenticated={props.isUserAuthenticated} />
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  isUserAuthenticated: React.PropTypes.bool,
};

function NavBarRight(props) {
  const content = props.isUserAuthenticated
    ? (
    <div
      className="title-bar-right"
      id="title-bar-right"
    />
    )
    : (
    <div
      className="title-bar-right"
      id="title-bar-right"
    >
      <a
        href="/login"
        type="button"
        className="button link-button"
      >
        Log In
      </a>
      <a
        href="/sign-up"
        type="button"
        className="z-musturd button link-button hollow"
      >
        Sign Up
      </a>
    </div>
    );
  return content;
}

NavBarRight.propTypes = {
  isUserAuthenticated: React.PropTypes.bool,
};

NavBarRight.defaultProps = {
  isUserAuthenticated: false,
};
