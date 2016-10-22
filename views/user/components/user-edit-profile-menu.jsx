import React from 'react';
import Url from '../../helpers/url-helper';

export default function EditProfileMenu(props) {
  return (
    <div className="card">
      <ul className="list-unstyled list-menu card-block">
        <li>
          <a
            className={(props.active === 'edit-profile' ? 'active' : '')}
            href={Url.action('user/profile')}
          >
            {props.resource.editProfile}
          </a>
        </li>
        <li>
          <a
            className={(props.active === 'reviews' ? 'active' : '')}
            href={Url.action('user/profile/reviews')}
          >
            {props.resource.reviews}
          </a>
        </li>
      </ul>
      <div className="card-block">
        <a
          className="link-view-profile"
          href={Url.action('users/profile-id')}
        >
          {props.resource.viewProfile}
        </a>
      </div>
    </div>
  );
}

EditProfileMenu.propTypes = {
  active: React.PropTypes.string,
  resource: React.PropTypes.object.isRequired,
};
