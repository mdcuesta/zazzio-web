import React, { Component } from 'react';
import Store from '../../stores/authentication-store';
import AuthActions from '../../actions/authentication-actions';
import FormErrorLabel from '../common/form-error-label';
import ModalActions from '../../actions/login-modal-actions';
import Url from '../../helpers/url-helper';

const REGISTER = 'register';

export default class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
      accountUnconfirmed: false,
      unconfirmedEmail: '',
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
    this.login = this.login.bind(this);
    this.popFBLogin = this.popFBLogin.bind(this);
    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    const hasError = Store.hasError();
    const message = Store.getMessage();
    if (!hasError) {
      return location.reload(true);
    }

    const emailValue = message === 'Invalid password' || message === 'Account unconfirmed'
      ? this.state.email.value
      : '';

    this.setState({
      hasError,
      message,
      email: {
        value: emailValue,
        error: message !== 'Invalid password' ? message : '',
        hasError: message !== 'Invalid password',
      },
      password: {
        value: '',
        error: message === 'Invalid password' ? 'Invalid password' : '',
        hasError: message === 'Invalid password',
      },
      accountUnconfirmed: message === 'Account unconfirmed',
      unconfirmedEmail: message === 'Account unconfirmed' ? emailValue : '',
      loggingIn: false,
      loginText: 'Login',
    });
    if (message === 'Invalid password') {
      return $('#txt-login-password').focus();
    }
    return $('#txt-login-email').focus();
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
    const emailValid = this.validate('email', this.state.email.value);
    const passwordValid = this.validate('password', this.state.password.value);

    if (emailValid && passwordValid) {
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
  }

  handleBlur(e) {
    const key = e.target.name;
    const value = e.target.value.trim();
    this.validate(key, value);
  }

  validate(key, value) {
    let state = null;
    let error = '';
    if (key === 'email') {
      if (this.state.accountUnconfirmed && value === this.state.unconfirmedEmail) {
        error = 'Account unconfirmed';
      } else if (value === '') {
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
    return error === '';
  }

  handleChange(e) {
    const state = {};
    state[e.target.name] = {
      value: e.target.value,
      error: this.state[e.target.name].error,
      hasError: this.state[e.target.name].hasError,
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
    const emailClass = 'form-control';
    const passwordClass = 'form-control';
    return (
      <div role="form">
        <section className="section-facebook-login">
          <div className="col-sm-12 form-group">
            <button
              id="btn-login-facebook"
              onClick={this.popFBLogin}
              className="btn btn-block btn-facebook"
            >
              <i className="fa fa-thumbs-o-up" />&nbsp;
              Log in with Facebook
            </button>
          </div>
        </section>
        <div className="divider"><span>or</span></div>
        <section className="section-regular-login">
          <div
            className={'col-sm-12 ' +
            `form-group${(this.state.email.hasError
              || this.state.accountUnconfirmed ? ' has-danger' : '')}`}
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
            <EmailErrorLabel error={this.state.email.error} />
          </div>
          <div
            className={'col-sm-12 ' +
            `form-group${(this.state.password.hasError ? ' has-danger' : '')}`}
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
          <div className="col-sm-12 text-right form-group">
            <a
              href={Url.action('forgot-password')}
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
          <div className="col-sm-12 form-group">
            <button
              className="btn btn-block btn-primary"
              type="button"
              onClick={this.login}
            >
              {this.state.loginText}
            </button>
          </div>
        </section>
        <section className="section-register">
          <div className="text-center">
            <span className="link-span">Don"t have an account?&nbsp;</span>
            <a
              onClick={() => ModalActions.setModalType(REGISTER)}
              className="link link-span"
              role="button"
              data-toggle="modal"
              href={Url.action('sign-up')}
            >
              Sign Up
            </a>
          </div>
        </section>
      </div>
    );
  }
}


function EmailErrorLabel(props) {
  if (props.error === 'Account unconfirmed') {
    return (
      <div className="error-span-container">
        <span
          className="error-span form-control-feedback"
        >
          Please confirm your account to login.&nbsp;
          <a
            className="link link-span link-span-confirm"
            role="button"
            href={Url.action('sign-up/confirmation/resend')}
          >
            Didn't receive any confirmation?
          </a>
        </span>
      </div>
    );
  }
  return (<FormErrorLabel error={props.error} />);
}

EmailErrorLabel.propTypes = {
  error: React.PropTypes.string,
};
