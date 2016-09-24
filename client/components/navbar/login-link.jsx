import React from 'react';
import ModalActions from '../../actions/login-modal-actions';
import Url from '../../helpers/url-helper';

const LOGIN = 'login';

export function LoginLink(props) {
  return (
    <a
      className="nav-link"
      data-toggle="modal"
      data-target={`#${props.loginModalId}`}
      data-backdrop="static"
      onClick={() => ModalActions.setModalType(LOGIN)}
      href={Url.action('login')}
      id="link-login"
    >
      Log in
    </a>
  );
}

LoginLink.propTypes = {
  loginModalId: React.PropTypes.string.isRequired,
};

export function LoginDropdownLink(props) {
  return (
    <a
      className="dropdown-item nav-link"
      data-toggle="modal"
      data-target={`#${props.loginModalId}`}
      data-backdrop="static"
      onClick={() => ModalActions.setModalType(LOGIN)}
      href={Url.action('login')}
      id="dropdown-link-login"
    >
      Log in
    </a>
  );
}

LoginDropdownLink.propTypes = {
  loginModalId: React.PropTypes.string.isRequired,
};
