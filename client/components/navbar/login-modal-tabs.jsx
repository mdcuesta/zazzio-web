import React, { Component } from 'react';
import LoginPanel from './login-panel';
import RegisterPanel from './register-panel';
import ModalStore from '../../stores/login-modal-store';
import ModalActions from '../../actions/login-modal-actions';

const LOGIN = 'Log In';
const REGISTER = 'Sign Up';

/**
 * LoginModalTabs
 */
export default class LoginModalTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: 'login',
    };
    this.onChange = this.onChange.bind(this);
    this.setModalType = this.setModalType.bind(this);
    ModalStore.addChangeListener(this.onChange);
  }

  onChange() {
    const modalType = ModalStore.getModalType();
    this.setState({
      modalType,
    });
  }

  setModalType(modalType) {
    ModalActions.setModalType(modalType);
  }

  render() {
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
              className={`${this.state.modalType === 'login' ? 'active' : ''}`}
              role="button"
              onClick={() => this.setModalType('login')}
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
              className={`${this.state.modalType === 'register' ? 'active' : ''}`}
              role="button"
              onClick={() => this.setModalType('register')}
            >
              {REGISTER}
            </a>
          </li>
        </ul>
        <div className="login-modal-tabs-content">
          <div
            style={(this.state.modalType === 'register' ? { display: 'none' } : {})}
            id="panel-signin"
          >
            <LoginPanel />
          </div>
          <div
            style={(this.state.modalType === 'login' ? { display: 'none' } : {})}
            id="panel-signup"
          >
            <RegisterPanel />
          </div>
        </div>
      </div>
    );
  }
}
