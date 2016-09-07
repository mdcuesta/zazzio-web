import React, { Component } from 'react';
import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.reveal';
import LoginModal from './login-modal';
import Store from '../../stores/quick-register-store';

const LOGIN = 'login';
const REGISTER = 'register';
const LOGIN_MODAL_ID = 'login-modal';

export default class NavBarRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: LOGIN,
      account: {
        displayName: '',
        email: '',
      },
    };
    this.setModalType = this.setModalType.bind(this);

    this.onChange = this.onChange.bind(this);
    Store.addChangeListener(this.onChange);
  }

  onChange() {
    const account = Store.getCreatedAccount();
    if (account == null) {
      return;
    }

    this.setState({
      account: {
        displayName: account.displayName,
        email: account.email,
      },
    });

    location.reload(true);
  }

  setModalType(modalType) {
    this.setState({
      modalType,
    });
  }

  render() {
    return (
      <div
        className="title-bar-right"
        id="title-bar-right"
      >
        <button
          type="button"
          className="button link-button"
          data-open="login-modal"
          onClick={() => this.setModalType(LOGIN)}
        >
          Log In
        </button>
        <button
          type="button"
          className="z-musturd button link-button hollow"
          data-open="login-modal"
          onClick={() => this.setModalType(REGISTER)}
        >
          Sign Up
        </button>
        <LoginModal
          id={LOGIN_MODAL_ID}
          modalType={this.state.modalType}
        />
      </div>
    );
  }
}
