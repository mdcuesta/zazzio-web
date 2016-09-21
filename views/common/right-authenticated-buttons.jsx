import React from 'react';
import Url from '../helpers/url-helper';

export default function RightAuthenticatedButtons(props) {
  return (
    <div
      className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
      id="navbar-right"
    >
      <ul className="nav navbar-nav hidden-md-down">
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
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href={Url.action('user/dashboard')}
            >
              My Account
            </a>
            <div className="dropdown-divider" />
            <a
              className="dropdown-item"
              href={Url.action('logout')}
            >
              Log out
            </a>
          </div>
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
