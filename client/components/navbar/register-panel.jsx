import Validator from 'validator';
import React, { Component } from 'react';
import RegisterActions from '../../actions/register-actions';
import Store from '../../stores/quick-register-store';

const validator = Validator;

export default class RegisterPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      emailValid: true,
      signUpText: 'Sign Up',
    };

    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.getInputClass = this.getInputClass.bind(this);
    this.validateState = this.validateState.bind(this);

    this.onChange = this.onChange.bind(this);
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    const error = Store.getError();
    const submitHasError = Store.hasError();
    this.setState({
      error,
      submitHasError,
      signingUp: false,
      signUpText: 'Sign Up',
    });
  }

  getInputClass(e) {
    return (this.state[e.target.name] === '' && this.state[`${e.target.name}Focused`])
      ? 'is-invalid-input'
      : '';
  }

  handleChange(e) {
    const state = {};
    state[e.target.name] = e.target.value.trim();
    this.setState(state);
  }

  handleEmailChange(e) {
    const isEmail = validator.isEmail(e.target.value.trim());

    this.setState({
      email: e.target.value.trim(),
      submitHasError: false,
      emailValid: isEmail,
    });
  }

  handleBlur(e) {
    const state = {};
    if (this.state[e.target.name] === '') {
      state[`${e.target.name}Class`] = 'is-invalid-input';
    } else {
      state[`${e.target.name}Class`] = '';
    }
    this.setState(state);
  }

  handleEmailBlur() {
    let emailClass = '';
    if (this.state.email !== '' && this.state.emailValid) {
      RegisterActions.checkAccountExistence(this.state.email);
    } else {
      emailClass = 'is-invalid-input';
    }

    this.setState({
      emailClass,
    });
  }

  register() {
    if (this.state.signingUp) {
      return;
    }

    this.validateState('email');
    this.validateState('password');
    this.validateState('firstName');
    this.validateState('lastName');

    if (!validator.isEmail(this.state.email)) {
      this.setState({
        emailClass: 'is-invalid-input',
      });
    }

    if (this.state.email === '' ||
      this.state.submitHasError ||
      !validator.isEmail(this.state.email)) {
      $('#txt-email').focus();
    } else if (this.state.password === '') {
      $('#txt-password').focus();
    } else if (this.state.firstName === '') {
      $('#txt-first-name').focus();
    } else if (this.state.lastName === '') {
      $('#txt-last-name').focus();
    } else {
      this.setState({
        signUpText: 'Signing up....',
        signingUp: true,
      });
      RegisterActions.quickRegisterBuyer({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      });
    }
  }

  validateState(key) {
    const state = {};
    if (this.state[key] === '') {
      state[`${key}Class`] = 'is-invalid-input';
    } else {
      state[`${key}Class`] = '';
    }
    this.setState(state);
  }

  render() {
    return (
      <div>
        <section className="section-regular-sign-up">
          <form
            method="post"
            action="/account/sign-up"
            data-abide
            noValidate
          >
            <div className="small-12 medium-12 large-12">
              <h5>Sign up to experience awesome</h5>
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                type="text"
                placeholder="Email Address"
                id="txt-email"
                name="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                onBlur={this.handleEmailBlur}
                className={this.state.emailClass}
              />
              <span
                className={`form-error${(
                  (this.state.emailClass && this.state.emailClass !== '')
                  ? ' is-visible'
                  : '')}`}
              >
                {(this.state.email === ''
                  ? 'Email address is required'
                  : 'Invalid email address')}
              </span>
              <span
                className={`form-error${(
                  (this.state.submitHasError)
                  ? ' is-visible'
                  : '')}`}
              >
                {this.state.error === 'Invalid email address'
                  ? this.state.error
                  : 'An account is already associated with this email. '}
                <a
                  href="/forgot-password"
                  className={(this.state.error === 'Invalid email address'
                    ? 'hide' : '')}
                >
                  Forgot your password?
                </a>
              </span>
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="txt-password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className={this.state.passwordClass}
              />
              <span
                className={`form-error${(
                  (this.state.passwordClass && this.state.passwordClass !== '')
                  ? ' is-visible'
                  : '')}`}
              >
                Password is required
              </span>
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                type="text"
                placeholder="Firstname"
                name="firstName"
                id="txt-first-name"
                value={this.state.firstName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className={this.state.firstNameClass}
              />
              <span
                className={`form-error${(
                  (this.state.firstNameClass && this.state.firstNameClass !== '')
                  ? ' is-visible'
                  : '')}`}
              >
                First name is required
              </span>
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                type="text"
                placeholder="Lastname"
                name="lastName"
                id="txt-last-name"
                value={this.state.lastName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className={this.state.lastNameClass}
              />
              <span
                className={`form-error${(
                  (this.state.lastNameClass && this.state.lastNameClass !== '')
                  ? ' is-visible'
                  : '')}`}
              >
                Last name is required
              </span>
            </div>
            <div className="small-12 medium-12 large-12">
              <span className="content-span">By clicking Sign Up you agree to our&nbsp;
                <a href="/terms">Terms</a> of use.
              </span>
            </div>
            <div className="small-12 medium-12 large-12">
              <button
                className="expanded success button modal-login-button"
                type="button"
                onClick={this.register}
              >
                {this.state.signUpText}
              </button>
            </div>
          </form>
        </section>
        <section className="section-facebook-sign-up">
          <div className="divider"><span>or</span></div>
          <div className="small-12 medium-12 large-12">
            <a
              href="/sign-up/facebook"
              className="expanded facebook-blue button modal-login-button"
            >
              <i className="fi-social-facebook login-facebook-icon" />
              Sign Up with Facebook
            </a>
          </div>
        </section>
      </div>
    );
  }
}
