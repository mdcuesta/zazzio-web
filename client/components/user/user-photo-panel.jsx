import React, { Component } from 'react';
import Image from '../../helpers/image-helper';
import Actions from '../../actions/file-actions';
import Store from '../../stores/user-photo-store';

export default class UserUploadPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.onChange = this.onChange.bind(this);
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    const photo = Store.getUserProfilePhoto();
    this.setState({
      photo,
    });
  }

  uploadPhoto(e) {
    const file = e.target.files[0];
    Actions.uploadPhoto(file);
  }

  render() {
    const profilePhoto = this.state.photo === null
      ? Image.cdn(this.props.profilePhoto)
      : Image.cdn(this.state.photo);

    return (
      <div
        className="card"
        id="user-photo-panel"
      >
        <img
          className="card-img-top card-img-profile-pic"
          src={profilePhoto}
          alt={this.props.altText}
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
            <input
              id="file-photo"
              type="file"
              className="hidden"
              onChange={this.uploadPhoto}
              accept="image/*"
            />
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
}

UserUploadPhoto.propTypes = {
  altText: React.PropTypes.string.isRequired,
  profilePhoto: React.PropTypes.string.isRequired,
};
