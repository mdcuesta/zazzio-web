import React from 'react';
import Url from '../helpers/url-helper';
import Image from '../helpers/image-helper';
import UserMenuDropdown from './user-menu-dropdown';
import ResourceHelper from '../helpers/resource-helper';

export default function RightAuthenticatedButtons(props) {
  const RES_NAVBAR = ResourceHelper.getResource('navbar', props.locale);

  const profilePhoto = props.user.profilePhoto === ''
    ? (<img
      className="nav-profile-photo"
      src={Image.cdn('user-default-profile-photo')}
      alt={props.user.firstName}
    />)
    : (<img
      className="nav-profile-photo"
      src={Image.cdn(props.user.profilePhoto, [{
        crop: 'scale',
        width: 100,
      }, {
        width: 50,
        height: 50,
        crop: 'crop',
        gravity: 'face',
        radius: 'max',
      }])}
      alt={props.user.firstName}
    />);

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
            {RES_NAVBAR.listYourProperty}
          </a>
        </li>
        <li
          className="nav-item nav-item-separator hidden border-right-0"
          id="nav-item-notification"
        />
        <li className="nav-item nav-item-separator dropdown">
          <a
            className="nav-link nav-link-profile-photo dropdown-toggle-user"
            href={Url.action('user/dashboard')}
            id="link-user-menu"
            data-img-id={props.user.profilePhoto}
            data-img-alt={props.user.firstName}
          >
            {profilePhoto}
          </a>
          <UserMenuDropdown user={props.user} />
        </li>
        <li
          className="nav-item nav-item-separator"
          id="nav-item-sign-out"
        >
          <a
            className="nav-link"
            href={Url.action('logout')}
          >
            <i className="nav-icon fa fa-large fa-sign-out" />
          </a>
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
  locale: React.PropTypes.string.isRequired,
};
