import React, { Component } from 'react';
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
        className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
        id="navbar-right"
      >
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#login-modal"
          data-backdrop="static"
          onClick={() => this.setModalType(LOGIN)}
        >
          Log In
        </button>
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target="#login-modal"
          data-backdrop="static"
          onClick={() => this.setModalType(REGISTER)}
        >
          Sign Up
        </button>
        <LoginModal
          id={LOGIN_MODAL_ID}
          modalType={this.state.modalType}
          setModalType={this.setModalType}
        />
      </div>
    );
  }
}
