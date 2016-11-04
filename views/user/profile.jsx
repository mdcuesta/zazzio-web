import React from 'react';
import UserPageLayout from './user-pages-layout';
import EditProfileMenu from './components/user-edit-profile-menu';
import EditProfileForm from './components/user-edit-profile-form';
import UserPhotoPanel from './components/user-photo-panel';
import Url from '../helpers/url-helper';
import ResourceHelper from '../helpers/resource-helper';

export default function Profile(props) {
  const RES_PROFILE = ResourceHelper.getResource('user-edit-profile', props.locale);
  const errors = [];
  if (props.errors.length > 0) {
    props.errors.map((e) => {
      if (e === 'FirstName') {
        errors.push(RES_PROFILE.errors.firstName);
        return 1;
      } else if (e === 'LastName') {
        errors.push(RES_PROFILE.errors.lastName);
        return 1;
      }
      return 0;
    });
  }

  const errorPanel = errors.length > 0
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
      {RES_PROFILE.errors.requiredFields}&nbsp;<strong>{errors.join(', ')}</strong>
    </div>)
    : '';

  return (
    <UserPageLayout
      title={RES_PROFILE.title}
      scripts={[Url.cdn('javascripts/user-profile')]}
      styles={[Url.cdn('stylesheets/user-profile')]}
      csrfToken={props.csrfToken}
      user={props.user}
      page="profile"
      locale={props.locale}
      route={props.route}
    >
      <div className="row main-content">
        <div className="col-sm-12 col-md-4 col-lg-3">
          <EditProfileMenu
            active="edit-profile"
            resource={RES_PROFILE.sideMenu}
          />
          <UserPhotoPanel
            profile={props.profile}
            resource={RES_PROFILE.photoPanel}
          />
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
          <div className="card">
            <div className="card-header">
              {RES_PROFILE.profile}
            </div>
            {errorPanel}
            <EditProfileForm
              user={props.user}
              profile={props.profile}
              csrfToken={props.csrfToken}
              resource={RES_PROFILE.form}
            />
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
}

Profile.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  profile: React.PropTypes.object.isRequired,
  errors: React.PropTypes.array,
  uploadCredentials: React.PropTypes.object,

  // default properties
  route: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
  locale: React.PropTypes.string.isRequired,
};

Profile.defaultProps = {
  errors: [],
};
