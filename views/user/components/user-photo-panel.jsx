import React from 'react';
import Image from '../../helpers/image-helper';

export default function UserPhotoPanel(props) {
  const profilePhoto = props.profile.profilePhoto === ''
    ? 'user-default-profile-photo.png'
    : props.profile.profilePhoto;

  return (
    <div
      className="card"
      id="user-photo-panel"
      data-img-id={profilePhoto}
      data-img-alt={props.profile.firstName}
    >
      <img
        className="card-img-top card-img-profile-pic"
        src={Image.cdn(profilePhoto)}
        alt={props.profile.firstName}
      />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <label
            htmlFor="file-photo"
            role="button"
            className="btn btn-secondary btn-block"
          >
            Upload a Photo
          </label>
          <input id="file-photo" type="file" className="hidden" />
        </li>
        <li className="list-group-item">
          <button className="btn btn-danger btn-block">
            Remove your Photo
          </button>
        </li>
      </ul>
    </div>
  );
}

UserPhotoPanel.propTypes = {
  profile: React.PropTypes.object.isRequired,
};
