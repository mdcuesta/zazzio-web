import React from 'react';
import Url from '../../helpers/url-helper';
import ResourceHelper from '../../helpers/resource-helper';

export default function UserNavBar(props) {
  const RES_NAVBAR = ResourceHelper.getResource('user-navbar', props.locale);

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
              {RES_NAVBAR.dashboard}
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${(props.active === 'listings' ? 'active' : '')}`}
              href={Url.action('user/listings')}
            >
              {RES_NAVBAR.listings}
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${(props.active === 'messages' ? 'active' : '')}`}
              href={Url.action('user/messages')}
            >
              {RES_NAVBAR.messages}
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${(props.active === 'profile' ? 'active' : '')}`}
              href={Url.action('user/profile')}
            >
              {RES_NAVBAR.profile}
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${(props.active === 'account' ? 'active' : '')}`}
              href={Url.action('user/account')}
            >
              {RES_NAVBAR.account}
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

