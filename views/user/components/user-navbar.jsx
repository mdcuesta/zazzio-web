import React from 'react';
import Url from '../../helpers/url-helper';

export default function UserNavBar(props) {
  return (
    <nav
      className="navbar navbar-user"
      role="navigation"
    >
      <div className="container">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a
              className={`nav-link ${(props.active === 'dashboard' ? 'active' : '')}`}
              href={Url.action('user/dashboard')}
            >
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${(props.active === 'listings' ? 'active' : '')}`}
              href={Url.action('user/listings')}
            >
              Listings
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${(props.active === 'messages' ? 'active' : '')}`}
              href={Url.action('user/messages')}
            >
              Messages
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${(props.active === 'profile' ? 'active' : '')}`}
              href={Url.action('user/profile')}
            >
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${(props.active === 'account' ? 'active' : '')}`}
              href={Url.action('user/account')}
            >
              Account
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

UserNavBar.propTypes = {
  active: React.PropTypes.string.isRequired,
  locale: React.PropTypes.string.isRequired,
};

