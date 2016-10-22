import React from 'react';
import ModalActions from '../../actions/login-modal-actions';
import Url from '../../helpers/url-helper';

const REGISTER = 'register';
const RES_NAVBAR = require(`../../localization/${process.env.LOCALE}/navbar`);

export function SignUpLink(props) {
  return (
    <a
      className="nav-link"
      data-toggle="modal"
      data-target={`#${props.loginModalId}`}
      data-backdrop="static"
      onClick={() => ModalActions.setModalType(REGISTER)}
      href={Url.action('sign-up')}
      id="link-sign-up"
    >
      {RES_NAVBAR.signUp}
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
      href={Url.action('sign-up')}
      id="dropdown-link-sign-up"
    >
      {RES_NAVBAR.signUp}
    </a>
  );
}

SignUpDropdownLink.propTypes = {
  loginModalId: React.PropTypes.string.isRequired,
};
