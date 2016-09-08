import Validator from 'validator';
import React, { Component } from 'react';
import SignUpActions from '../../actions/register-actions';
import Store from '../../stores/quick-register-store';
import FormErrorLabel from '../common/form-error-label';

const EMAIL_ADDRESS_REQUIRED = 'Email Address required';
const EMAIL_ADDRESS_INVALID = 'Invalid Email Address';
const PASSWORD_REQUIRED = 'Password required';
const PASSWORD_LENGTH_ERROR = 'Password must be at least 6 characters';
const FIRST_NAME_REQUIRED = 'First name required';
const LAST_NAME_REQUIRED = 'Last name required';
const EMAIL_ALREADY_ASSOCIATED = 'There is already an account associated for this email address';

const validator = Validator;

export default class RegisterPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      firstName: {
        value: '',
        error: '',
        hasError: false,
      },
      lastName: {
        value: '',
        error: '',
        hasError: false,
      },
      signUpText: 'Sign Up',
    };

    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.getTextInputClass = this.getTextInputClass.bind(this);
    this.validateState = this.validateState.bind(this);
    this.validateInput = this.validateInput.bind(this);

    this.onChange = this.onChange.bind(this);
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    const error = Store.getError();
    const submitHasError = Store.hasError();
    if (error === `${EMAIL_ALREADY_ASSOCIATED} ${this.state.email.value}`) {
      $('#txt-email').focus();
    }
    this.setState({
      email: {
        error,
        value: this.state.email.value,
        hasError: error !== '',
      },
      signingUp: false,
      signUpText: 'Sign Up',
      submitHasError,
    });
  }

  getTextInputClass(key) {
    return (this.state[key].hasError)
      ? 'is-invalid-input'
      : '';
  }

  handleBlur(e) {
    this.validateInput(e.target.name, e.target.value);
  }

  handleChange(e) {
    const state = {};
    state[e.target.name] = {
      value: e.target.value.trim(),
    };
    this.setState(state);
  }

  validateInput(key, value) {
    let state = null;
    let error = '';
    if (key === 'email') {
      if (value === '') {
        error = EMAIL_ADDRESS_REQUIRED;
      } else if (!validator.isEmail(value)) {
        error = EMAIL_ADDRESS_INVALID;
      } else {
        SignUpActions.checkAccountExistence(this.state.email.value);
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
        error = PASSWORD_REQUIRED;
      } else if (value.length < 6) {
        error = PASSWORD_LENGTH_ERROR;
      }
      state = {
        password: {
          hasError: error !== '',
          error,
          value,
        },
      };
    } else if (key === 'firstName') {
      if (value === '') {
        error = FIRST_NAME_REQUIRED;
      }
      state = {
        firstName: {
          hasError: error !== '',
          error,
          value,
        },
      };
    } else if (key === 'lastName') {
      if (value === '') {
        error = LAST_NAME_REQUIRED;
      }
      state = {
        lastName: {
          hasError: error !== '',
          error,
          value,
        },
      };
    }
    if (state !== null) {
      this.setState(state);
    }
    return error !== '';
  }

  register() {
    if (this.state.signingUp) {
      return;
    }

    const emailHasError = this.validateInput('email', this.state.email.value);
    const passwordHasError = this.validateInput('password', this.state.password.value);
    const firstNameHasError = this.validateInput('firstName', this.state.firstName.value);
    const lastNameHasError = this.validateInput('lastName', this.state.lastName.value);

    if (emailHasError) {
      $('#txt-email').focus();
    } else if (passwordHasError) {
      $('#txt-password').focus();
    } else if (firstNameHasError) {
      $('#txt-first-name').focus();
    } else if (lastNameHasError) {
      $('#txt-last-name').focus();
    } else {
      this.setState({
        signUpText: 'Signing up....',
        signingUp: true,
      });
      SignUpActions.quickRegisterBuyer({
        email: this.state.email.value,
        password: this.state.password.value,
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
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
    const emailClass = this.getTextInputClass('email');
    const passwordClass = this.getTextInputClass('password');
    const firstNameClass = this.getTextInputClass('firstName');
    const lastNameClass = this.getTextInputClass('lastName');

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
                value={this.state.email.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className={emailClass}
              />
              <EmailErrorLabel error={this.state.email.error} />
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="txt-password"
                value={this.state.password.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className={passwordClass}
              />
              <FormErrorLabel error={this.state.password.error} />
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                type="text"
                placeholder="Firstname"
                name="firstName"
                id="txt-first-name"
                value={this.state.firstName.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className={firstNameClass}
              />
              <FormErrorLabel error={this.state.firstName.error} />
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                type="text"
                placeholder="Lastname"
                name="lastName"
                id="txt-last-name"
                value={this.state.lastName.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                className={lastNameClass}
              />
              <FormErrorLabel error={this.state.lastName.error} />
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

function EmailErrorLabel(props) {
  if (props.error !== EMAIL_ADDRESS_REQUIRED
    && props.error !== EMAIL_ADDRESS_INVALID
    && typeof props.error !== 'undefined') {
    return (
      <span
        className={`form-error${(props.error !== '' ? ' is-visible' : '')}`}
      >
        An account is already associated with this email.&nbsp;
        <a href="/forgot-password">Forgot your password?</a>
      </span>
    );
  }

  return (
    <FormErrorLabel error={props.error} />
  );
}

EmailErrorLabel.propTypes = {
  error: React.PropTypes.string,
};
