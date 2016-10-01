import React from 'react';
import Url from '../../helpers/url-helper';

export default function UserProfilePanel(props) {
  return (
    <div className="card card-profile-pic text-center">
      <a href={Url.action('users/profile-id')}>
        <img
          className="card-img-top card-img-profile-pic"
          src={Url.cdn('images/user-default-profile-photo.png')}
          alt={props.user.firstName}
        />
      </a>
      <div className="card-block">
        <h5 className="card-title">{props.user.displayName}</h5>
        <ul className="list-unstyled">
          <li>
            <a
              href={Url.action('users/profile-id')}
              className="card-link"
            >
              View Profile
            </a>
          </li>
          <li>
            <a
              href={Url.action('user/profile')}
              className="card-link"
            >
              Edit Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

UserProfilePanel.propTypes = {
  user: React.PropTypes.object.isRequired,
};