import React from 'react';
import ModalActions from '../../actions/login-modal-actions';

const LOGIN = 'login';

export function LoginLink(props) {
  return (
    <a
      className="nav-link"
      data-toggle="modal"
      data-target={`#${props.loginModalId}`}
      data-backdrop="static"
      onClick={() => ModalActions.setModalType(LOGIN)}
      href="/login"
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
      href="/login"
      id="dropdown-link-login"
    >
      Log in
    </a>
  );
}

LoginDropdownLink.propTypes = {
  loginModalId: React.PropTypes.string.isRequired,
};
