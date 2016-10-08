import React, { Component } from 'react';
import Url from '../../helpers/url-helper';
import Image from '../../helpers/image-helper';
import Store from '../../stores/user-photo-store';

export default class UserMenuLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: props.image,
    };
    this.onChange = this.onChange.bind(this);
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    const photo = Store.getUserProfilePhoto();
    if (photo === this.state.photo || photo === null) {
      return;
    }
    this.setState({
      photo,
    });
  }

  render() {
    const profilePhoto = this.state.photo === ''
      ? (<img
        className="nav-profile-photo"
        src={Image.cdn('user-default-profile-photo')}
        alt={this.props.alt}
      />)
      : (<img
        className="nav-profile-photo"
        src={Image.cdn(this.state.photo, [{
          crop: 'scale',
          width: 100,
        }, {
          width: 50,
          height: 50,
          crop: 'crop',
          gravity: 'face',
          radius: 'max',
        }])}
        alt={this.props.alt}
      />);

    return (
      <a
        className="nav-link nav-link-profile-photo dropdown-toggle dropdown-toggle-user"
        data-toggle="dropdown"
        href={Url.action('user/dashboard')}
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
        id="link-user-menu"
      >
        {profilePhoto}
      </a>
    );
  }
}

UserMenuLink.propTypes = {
  image: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
};
