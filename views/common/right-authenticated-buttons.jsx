import React from 'react';
import Url from '../helpers/url-helper';

export default function RightAuthenticatedButtons(props) {
  return (
    <div
      className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
      id="navbar-right"
    >
      <ul className="nav navbar-nav hidden-md-down">
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link nav-list-property"
            href={Url.action('list-property')}
          >
            List Your Property
          </a>
        </li>
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link"
            href={Url.action('help')}
          >
            <i className="nav-icon fa fa-large fa-bell-o" />
          </a>
        </li>
        <li className="nav-item nav-item-separator dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown" href={Url.action('user/dashboard')}
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="nav-profile-photo"
              src={Url.cdn('images/user-default-photo.png')}
              alt="user"
            />
            <span>
              {props.user.firstName}
            </span>
          </a>
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
                className="dropdown-item"
                href={Url.action('user/dashboard')}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href={Url.action('user/inbox')}
              >
                Inbox
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
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href={Url.action('help')}
          >
            <i className="nav-icon fa fa-large fa-question-circle-o" />
          </a>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right-md hidden-sm-down hidden-lg-up">
        <li className="nav-item">
          <a
            className="nav-link"
            href={Url.action('logout')}
          >
            <i className="nav-icon fa fa-large fa-sign-out" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href={Url.action('help')}
          >
            <i className="nav-icon fa fa-large fa-question-circle-o" />
          </a>
        </li>
      </ul>
    </div>
  );
}

RightAuthenticatedButtons.propTypes = {
  user: React.PropTypes.object.isRequired,
};
