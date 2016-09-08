import React, { Component } from 'react';
import Store from '../../stores/authentication-store';
import AuthActions from '../../actions/authentication-actions';
import FormErrorLabel from '../common/form-error-label';

export default class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
      loggingIn: false,
      loginText: 'Login',
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
    this.register = this.register.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.getTextInputClass = this.getTextInputClass.bind(this);
    this.login = this.login.bind(this);
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
        error: '',
        hasError: false,
      },
      password: {
        value: '',
        error: '',
        hasError: false,
      },
      loggingIn: false,
      loginText: 'Login',
    });

    if (message === 'Invalid password') {
      return $('#txt-login-password').focus();
    }
    return $('#txt-login-email').focus();
  }

  getTextInputClass(key) {
    return (this.state[key].hasError)
      ? 'is-invalid-input'
      : '';
  }

  register() {
    $('#panel-register-link').click();
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
    const value = e.target.value;

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
      value: e.target.value.trim(),
    };
    this.setState(state);
  }

  render() {
    const csrfToken = $('meta[name="csrf-token"]').attr('content');
    const emailClass = this.getTextInputClass('email');
    const passwordClass = this.getTextInputClass('password');

    return (
      <div>
        <section className="section-regular-login">
          <form
            method="post"
            action={`/auth/local?returnTo=${encodeURI(window.location.href)}`}
          >
            <div className="small-12 medium-12 large-12">
              <h5>Log in to experience awesome</h5>
            </div>
            <FormErrorLabel error={this.state.message} />
            <div className="small-12 medium-12 large-12">
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
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                id="txt-login-password"
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className={passwordClass}
              />
            </div>
            <div className="small-12 medium-12 large-12 text-align-right">
              <a href="/forgot-password">Forgot Password</a>
            </div>
            <input type="hidden" name="_csrf" value={csrfToken} />
            <div className="small-12 medium-12 large-12">
              <button
                className="expanded z-musturd button modal-login-button"
                type="button"
                onClick={this.login}
              >
                {this.state.loginText}
              </button>
            </div>
          </form>
        </section>
        <section className="section-facebook-login">
          <div className="divider"><span>or</span></div>
          <div className="small-12 medium-12 large-12">
            <a
              id="btn-login-facebook"
              href={`/auth/facebook?returnTo=${encodeURI(window.location.href)}`}
              className="expanded facebook-blue button modal-login-button"
            >
              <i className="fi-social-facebook login-facebook-icon" />
                    Log in with Facebook
            </a>
          </div>
        </section>
        <section className="section-register">
          <div className="small-12 medium-12 large-12">
            <span className="content-span">Don"t have an account?&nbsp;</span>
            <a href="/sign-up" onClick={this.register}>Sign Up</a>
          </div>
        </section>
      </div>
    );
  }
}
