import React from 'react';
import ModalActions from '../../actions/login-modal-actions';

const REGISTER = 'register';

export function SignUpLink(props) {
  return (
    <a
      className="nav-link"
      data-toggle="modal"
      data-target={`#${props.loginModalId}`}
      data-backdrop="static"
      onClick={() => ModalActions.setModalType(REGISTER)}
      href="/sign-up"
      id="link-sign-up"
    >
      Sign up
    </a>
  );
}

SignUpLink.propTypes = {
  loginModalId: React.PropTypes.string.isRequired,
};

export function SignUpDropdownLink(props) {
  return (
    <a
      className="dropdown-item nav-link"
      data-toggle="modal"
      data-target={`#${props.loginModalId}`}
      data-backdrop="static"
      onClick={() => ModalActions.setModalType(REGISTER)}
      href="/sign-up"
      id="dropdown-link-sign-up"
    >
      Sign up
    </a>
  );
}

SignUpDropdownLink.propTypes = {
  loginModalId: React.PropTypes.string.isRequired,
};
