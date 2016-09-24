import React from 'react';
import Url from '../helpers/url-helper';
import UserMenuDropdown from './user-menu-dropdown';

export default function RightAuthenticatedButtons(props) {
  return (
    <div
      className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
      id="navbar-right"
    >
      <ul className="nav navbar-nav hidden-sm-down">
        <li className="nav-item nav-item-list-property nav-item-separator">
          <a
            className="nav-link"
            href={Url.action('list-property')}
          >
            List Your Property
          </a>
        </li>
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link"
            href={Url.action('user/dashboard')}
          >
            <i className="nav-icon fa fa-large fa-bell-o" />
          </a>
        </li>
        <li className="nav-item nav-item-separator dropdown">
          <a
            className="nav-link nav-link-profile-photo dropdown-toggle dropdown-toggle-user"
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
          </a>
          <UserMenuDropdown user={props.user} />
        </li>
        <li className="nav-item hidden-md-down">
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
