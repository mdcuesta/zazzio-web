import React from 'react';
import Url from '../helpers/url-helper';

export default function UserMenuDropdown(props) {
  return (
    <ul
      className="dropdown-menu dropdown-menu-right"
      role="menu"
    >
      <li>
        <a
          className="dropdown-item dropdown-item-profile"
          href={Url.action('users/profile-id')}
        >
          {props.user.displayName}
          <span>{props.user.email}</span>
        </a>
      </li>
      <li>
        <div className="dropdown-divider" />
      </li>
      <li>
        <a
          className="dropdown-item dropdown-item-list-property"
          href={Url.action('list-property')}
        >
          <span className="btn-block">
            List Your Property
          </span>
        </a>
      </li>
      <li>
        <div className="dropdown-divider" />
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('user/dashboard')}
        >
          Dashboard
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('user/listings')}
        >
          Listings
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('user/messages')}
        >
          Messages
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('user/profile')}
        >
          Profile
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('user/account')}
        >
          Account
        </a>
      </li>
      <li className="hidden-lg-up">
        <div className="dropdown-divider" />
      </li>
      <li className="hidden-lg-up">
        <a
          className="dropdown-item"
          href={Url.action('help')}
        >
          Help
        </a>
      </li>
      <li>
        <div className="dropdown-divider" />
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('logout')}
        >
          Log out
        </a>
      </li>
    </ul>
  );
}

UserMenuDropdown.propTypes = {
  user: React.PropTypes.object.isRequired,
};
