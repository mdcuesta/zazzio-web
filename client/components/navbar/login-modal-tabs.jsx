import React from 'react';
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
        className="nav nav-tabs login-modal-tabs"
        role="tablist"
      >
        <li
          className="nav-item"
          role="tab"
        >
          <a
            id="login-panel-tab"
            className={`${props.modalType === 'login' ? 'active' : ''}`}
            role="button"
            onClick={() => props.setModalType('login')}
          >
            {LOGIN}
          </a>
        </li>
        <li
          className="nav-item"
          role="tab"
        >
          <a
            id="signup-panel-tab"
            className={`${props.modalType === 'register' ? 'active' : ''}`}
            role="button"
            onClick={() => props.setModalType('register')}
          >
            {REGISTER}
          </a>
        </li>
      </ul>
      <div className="login-modal-tabs-content">
        <div
          style={(props.modalType === 'register' ? { display: 'none' } : {})}
          id="panel-signin"
        >
          <LoginPanel setModalType={props.setModalType} />
        </div>
        <div
          style={(props.modalType === 'login' ? { display: 'none' } : {})}
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
  setModalType: React.PropTypes.func.isRequired,
};
