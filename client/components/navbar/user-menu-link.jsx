import React from 'react';
import Url from '../../helpers/url-helper';

export default function UserMenuLink() {
  return (
    <a
      className="nav-link nav-link-profile-photo dropdown-toggle dropdown-toggle-user"
      data-toggle="dropdown"
      href={Url.action('user/dashboard')}
      role="button"
      aria-haspopup="true"
      aria-expanded="false"
      id="link-user-menu"
    >
      <img
        className="nav-profile-photo"
        src={Url.cdn('images/user-default-photo.png')}
        alt="user"
      />
    </a>
  );
}
