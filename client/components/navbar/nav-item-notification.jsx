import React from 'react';
import Url from '../../helpers/url-helper';

export default function NavNotification() {
  return (
    <li
      className="nav-item nav-item-separator"
      id="nav-item-notification"
    >
      <a
        className="nav-link"
        href={Url.action('user/dashboard')}
      >
        <i className="nav-icon fa fa-large fa-bell-o" />
      </a>
    </li>
  );
}
