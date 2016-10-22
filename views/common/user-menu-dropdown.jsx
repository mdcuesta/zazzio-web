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
            {props.resource.listYourProperty}
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
          {props.resource.dashboard}
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('user/listings')}
        >
          {props.resource.listings}
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('user/messages')}
        >
          {props.resource.messages}
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('user/profile')}
        >
          {props.resource.profile}
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href={Url.action('user/account')}
        >
          {props.resource.account}
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
          {props.resource.help}
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
          {props.resource.logout}
        </a>
      </li>
    </ul>
  );
}

UserMenuDropdown.propTypes = {
  user: React.PropTypes.object.isRequired,
  resource: React.PropTypes.object.isRequired,
};
