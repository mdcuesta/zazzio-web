import React from 'react';
import UserPageLayout from './user-pages-layout';
import EditProfileMenu from './components/user-edit-profile-menu';
import EditProfileForm from './components/user-edit-profile-form';
import Url from '../helpers/url-helper';

export default function Profile(props) {
  return (
    <UserPageLayout
      title="Profile - Zazzio"
      jsbundle={Url.cdn('javascripts/user-profile.js')}
      cssbundle={Url.cdn('stylesheets/user-profile.css')}
      csrfToken={props.csrfToken}
      user={props.user}
      page="profile"
    >
      <div className="row main-content">
        <div className="col-sm-12 col-md-4 col-lg-3">
          <EditProfileMenu active="edit-profile" />
          <div className="card">
            <img
              className="card-img-top card-img-profile-pic"
              src={Url.cdn('images/user-default-profile-photo.png')}
              alt={props.user.profile.firstName}
            />
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <button className="btn btn-success btn-block">
                  Upload a Photo
                </button>
              </li>
              <li className="list-group-item">
                <button className="btn btn-danger">
                  Remove your Photo
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
          <div className="card">
            <div className="card-header">
              Profile
            </div>
            <EditProfileForm
              user={props.user}
              csrfToken={props.csrfToken}
            />
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
}

Profile.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
};

