import React from 'react';
import UserPageLayout from './user-pages-layout';
import EditProfileMenu from './components/user-edit-profile-menu';
import EditProfileForm from './components/user-edit-profile-form';
import UserPhotoPanel from './components/user-photo-panel';
import Url from '../helpers/url-helper';

export default function Profile(props) {
  const errorPanel = props.errors.length > 0
    ? (
    <div
      className="alert alert-danger alert-dismissible fade in"
      role="alert"
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      The following fields are required <strong>{props.errors.join(', ')}</strong>
    </div>)
    : '';

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
          <UserPhotoPanel profile={props.profile} />
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
          <div className="card">
            <div className="card-header">
              Profile
            </div>
            {errorPanel}
            <EditProfileForm
              user={props.user}
              profile={props.profile}
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
  profile: React.PropTypes.object.isRequired,
  errors: React.PropTypes.array,
  uploadCredentials: React.PropTypes.object,
};

Profile.defaultProps = {
  errors: [],
};
