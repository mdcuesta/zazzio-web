import React from 'react';
import Url from '../../helpers/url-helper';

export default function UserNavBar() {
  return (
    <nav className="navbar navbar-user">
      <div className="container">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href={Url.action('user/dashboard')}>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={Url.action('user/inbox')}>
              Inbox
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={Url.action('user/listings')}>
              Listings
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={Url.action('user/profile')}>
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={Url.action('user/account')}>
              Account
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
