import React from 'react';
import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.tabs';
import LoginPanel from './login-panel';
import RegisterPanel from './register-panel';

const LOGIN = 'Log In';
const REGISTER = 'Sign Up';

/**
 * LoginModalTabs
 */
export default function LoginModalTabs(props) {
  return (
    <div>
      <ul
        className="tabs login-modal-tabs"
        data-tabs id="login-modal-tabs"
      >
        <li className={`tabs-title${(props.modalType === 'login' ? ' is-active' : '')}`}>
          <a
            href="#panel-signin"
            aria-selected={props.modalType === 'login'}
            role="option"
          >
            {LOGIN}
          </a>
        </li>
        <li className={`tabs-title${(props.modalType === 'register' ? ' is-active' : '')}`}>
          <a
            href="#panel-signup"
            aria-selected={props.modalType === 'register'}
            id="panel-register-link"
            role="option"
          >
              {REGISTER}
          </a>
        </li>
      </ul>
      <div
        className="tabs-content login-modal-tabs-content"
        data-tabs-content="login-modal-tabs"
      >
        <div
          className={`tabs-panel${(props.modalType === 'login' ? ' is-active' : '')}`}
          id="panel-signin"
        >
          <LoginPanel />
        </div>
        <div
          className={`tabs-panel${(props.modalType === 'register' ? ' is-active' : '')}`}
          id="panel-signup"
        >
          <RegisterPanel />
        </div>
      </div>
    </div>
  );
}

LoginModalTabs.propTypes = {
  modalType: React.PropTypes.string.isRequired,
};
