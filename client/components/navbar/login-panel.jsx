import React, { Component } from 'react';
import Store from '../../stores/authentication-store';
import AuthActions from '../../actions/authentication-actions';
import FormErrorLabel from '../common/form-error-label';
import ModalActions from '../../actions/login-modal-actions';

export default class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
      loggingIn: false,
      loginText: 'Log in',
      email: {
        value: '',
        error: '',
        hasError: false,
      },
      password: {
        value: '',
        error: '',
        hasError: false,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.getTextInputClass = this.getTextInputClass.bind(this);
    this.login = this.login.bind(this);
    this.popFBLogin = this.popFBLogin.bind(this);
    this.submit = this.submit.bind(this);
    this.setModalType = this.setModalType.bind(this);
    Store.addChangeListener(this.onChange);
  }

  onChange() {
    const hasError = Store.hasError();
    const message = Store.getMessage();
    if (!hasError) {
      return location.reload(true);
    }

    const emailValue = message === 'Invalid password'
      ? this.state.email.value
      : '';

    this.setState({
      hasError,
      message,
      email: {
        value: emailValue,
        error: message === 'Invalid username' ? 'Invalid username' : '',
        hasError: message === 'Invalid username',
      },
      password: {
        value: '',
        error: message === 'Invalid password' ? 'Invalid password' : '',
        hasError: message === 'Invalid password',
      },
      loggingIn: false,
      loginText: 'Login',
    });

    if (message === 'Invalid password') {
      return $('#txt-login-password').focus();
    }
    return $('#txt-login-email').focus();
  }

  setModalType(modalType) {
    ModalActions.setModalType(modalType);
  }

  getTextInputClass(key) {
    return (this.state[key].hasError)
      ? 'form-control form-control-danger'
      : 'form-control';
  }

  popFBLogin() {
    const height = 255;
    const width = 475;
    const top = ($(window).height() / 2) - (height / 2);
    const left = ($(window).width() / 2) - (width / 2);
    window.open('/auth/popup/facebook', 'Facebook Login',
      `height=${height},width=${width}, top=${top}, left=${left}`);
  }

  login() {
    if (this.state.loggingIn) {
      return;
    }
    this.setState({
      loggingIn: true,
      loginText: 'Logging you in...',
    });
    AuthActions.login(this.state.email.value,
      this.state.password.value);
  }

  handleBlur(e) {
    const key = e.target.name;
    const value = e.target.value.trim();

    let state = null;
    let error = '';
    if (key === 'email') {
      if (value === '') {
        error = 'Email is required';
      }
      state = {
        email: {
          hasError: error !== '',
          error,
          value,
        },
      };
    } else if (key === 'password') {
      if (value === '') {
        error = 'Password is required';
      }
      state = {
        password: {
          hasError: error !== '',
          error,
          value,
        },
      };
    }
    if (state !== null) {
      this.setState(state);
    }
  }

  handleChange(e) {
    const state = {};
    state[e.target.name] = {
      value: e.target.value,
    };
    this.setState(state);
  }

  submit(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  render() {
    const csrfToken = $('meta[name="csrf-token"]').attr('content');
    const emailClass = this.getTextInputClass('email');
    const passwordClass = this.getTextInputClass('password');

    return (
      <div>
        <section className="section-regular-login">
          <div
            className={'col col-sm-12 col-md-12 col-lg-12 ' +
            `form-group ${(this.state.email.hasError ? 'has-danger' : '')}`}
          >
            <input
              id="txt-login-email"
              type="text"
              placeholder="Email Address"
              name="email"
              value={this.state.email.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              className={emailClass}
            />
            <FormErrorLabel error={this.state.email.error} />
          </div>
          <div
            className={'col col-sm-12 col-md-12 col-lg-12 ' +
            `form-group ${(this.state.password.hasError ? 'has-danger' : '')}`}
          >
            <input
              id="txt-login-password"
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onKeyDown={this.submit}
              className={passwordClass}
            />
            <FormErrorLabel error={this.state.password.error} />
          </div>
          <div className="col col-sm-12 col-md-12 col-lg-12 text-align-right form-group">
            <a
              href="/forgot-password"
              className="link-span"
            >
              Forgot Password?
            </a>
          </div>
          <input
            type="hidden"
            name="_csrf"
            value={csrfToken}
          />
          <div className="col-sm-12 col-md-12 col-lg-12 form-group">
            <button
              className="btn btn-success btn-login"
              type="button"
              onClick={this.login}
            >
              {this.state.loginText}
            </button>
          </div>
        </section>
        <section className="section-facebook-login">
          <div className="divider"><span>or</span></div>
          <div className="form-group">
            <button
              id="btn-login-facebook"
              onClick={this.popFBLogin}
              className="btn btn-login-facebook"
            >
              <i className="fa fa-thumbs-o-up" />&nbsp;
              Log in with Facebook
            </button>
          </div>
        </section>
        <section className="section-register">
          <div>
            <span className="link-span">Don"t have an account?&nbsp;</span>
            <span
              onClick={() => this.setModalType('register')}
              className="link link-span"
              role="button"
            >
              Sign Up
            </span>
          </div>
        </section>
      </div>
    );
  }
}
