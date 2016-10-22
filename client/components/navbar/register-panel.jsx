import Validator from 'validator';
import React, { Component } from 'react';
import SignUpActions from '../../actions/register-actions';
import Store from '../../stores/quick-register-store';
import FormErrorLabel from '../common/form-error-label';
import ModalActions from '../../actions/login-modal-actions';
import Url from '../../helpers/url-helper';

const RES_REGISTER = require(`../../localization/${process.env.LOCALE}/sign-up-modal`);

const LOGIN = 'login';
const EMAIL_ADDRESS_REQUIRED = 'EmailAddress.Required';
const EMAIL_ADDRESS_INVALID = 'EmailAddress.Invalid';
const PASSWORD_REQUIRED = 'Password.Required';
const PASSWORD_LENGTH_ERROR = 'Password.6.Characters';
const FIRST_NAME_REQUIRED = 'FirstName.Required';
const LAST_NAME_REQUIRED = 'LastName.Required';
const EMAIL_ALREADY_ASSOCIATED = 'There is already an account associated for this email address';
const SIGNING_UP_TEXT = RES_REGISTER.signingUp;
const SIGN_UP_TEXT = RES_REGISTER.signUp;

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
      isSeller: {
        value: false,
      },
      signUpText: SIGN_UP_TEXT,
      reloadPage: false,
    };

    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validateState = this.validateState.bind(this);
    this.validateInput = this.validateInput.bind(this);

    this.onChange = this.onChange.bind(this);
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    const account = Store.getCreatedAccount();
    if (account === null) {
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
        signUpText: SIGN_UP_TEXT,
        submitHasError,
      });
    } else if (!account.confirmationSent) {
      location.reload(true);
    } else {
      this.setState({
        signingUp: true,
        signUpText: SIGNING_UP_TEXT,
        reloadPage: true,
      });
    }
  }

  getSignUpCompletePanel() {
    return (
      <div role="form">
        <section className="section-regular-sign-up-complete">
          <h5 className="text-center">Your account has been successfully created.</h5>
          <p className="text-center">
            Please confirm your account by clicking the confirmation link
            that we sent to your email.  Thank you.
          </p>
          <div>
            <button
              className="btn btn-block btn-success btn-sign-up"
              onClick={() => location.reload(true)}
            >
              Got it!
            </button>
          </div>
        </section>
      </div>
    );
  }

  getSignUpForm() {
    const emailClass = 'form-control';
    const passwordClass = 'form-control';
    const firstNameClass = 'form-control';
    const lastNameClass = 'form-control';

    return (
      <div role="form">
        <section className="section-facebook-sign-up">
          <div className="col-sm-12 form-group">
            <a
              className="btn btn-block btn-facebook btn-link-button"
              href={Url.action('account/sign-up/facebook')}
            >
              <i className="fa fa-thumbs-o-up" />&nbsp;
              {RES_REGISTER.signUpWithFacebook}
            </a>
          </div>
        </section>
        <div className="divider"><span>or</span></div>
        <section className="section-regular-sign-up">
          <div
            className={'col-sm-12 ' +
            `form-group${(this.state.email.hasError ? ' has-danger' : '')}`}
          >
            <input
              type="text"
              placeholder={RES_REGISTER.emailAddress}
              id="txt-email"
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
              type="password"
              placeholder={RES_REGISTER.password}
              name="password"
              id="txt-password"
              value={this.state.password.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              className={passwordClass}
            />
            <FormErrorLabel
              error={this.state.password.error}
              resource={RES_REGISTER.errors}
            />
          </div>
          <div
            className={'col-sm-6 ' +
            `form-group${(this.state.firstName.hasError ? ' has-danger' : '')}`}
          >
            <input
              type="text"
              placeholder={RES_REGISTER.firstName}
              name="firstName"
              id="txt-first-name"
              value={this.state.firstName.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              className={firstNameClass}
            />
            <FormErrorLabel
              error={this.state.firstName.error}
              resource={RES_REGISTER.errors}
            />
          </div>
          <div
            className={'col-sm-6 ' +
            `form-group${(this.state.lastName.hasError ? ' has-danger' : '')}`}
          >
            <input
              type="text"
              placeholder={RES_REGISTER.lastName}
              name="lastName"
              id="txt-last-name"
              value={this.state.lastName.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              className={lastNameClass}
            />
            <FormErrorLabel
              error={this.state.lastName.error}
              resource={RES_REGISTER.errors}
            />
          </div>
          <div className="col-sm-12 form-group text-center">
            <label
              htmlFor="is-not-buyer"
              className="form-check-label"
            >
              <input
                id="is-not-buyer"
                type="checkbox"
                name="isSeller"
                className="form-check-input"
                checked={this.state.isSeller.value}
                onChange={this.handleChange}
              />
              &nbsp;{RES_REGISTER.industryProfessional}
            </label>
          </div>
          <div
            className={'col-btn-sign-up ' +
            'form-group text-center'}
          >
            <button
              className="btn btn-block btn-primary btn-sign-up"
              type="button"
              onClick={this.register}
            >
              {this.state.signUpText}
            </button>
            <span className="link-span">{RES_REGISTER.bySigningUp}&nbsp;
              <a href={Url.action('terms')}>{RES_REGISTER.terms}</a>{RES_REGISTER.ofUse}
            </span>
          </div>
        </section>
      </div>
    );
  }

  handleBlur(e) {
    const value = e.target.value.trim();
    this.validateInput(e.target.name, value);
  }

  handleChange(e) {
    const state = {};
    if (e.target.name !== 'isSeller') {
      state[e.target.name] = {
        value: e.target.value,
      };
    } else {
      state[e.target.name] = {
        value: e.target.checked,
      };
    }
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
      } else if (value.length < 8) {
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
        signUpText: SIGNING_UP_TEXT,
        signingUp: true,
      });
      SignUpActions.quickRegister({
        email: this.state.email.value,
        password: this.state.password.value,
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
        isSeller: this.state.isSeller.value,
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
    if (this.state.reloadPage) {
      return this.getSignUpCompletePanel();
    }
    return this.getSignUpForm();
  }
}

function EmailErrorLabel(props) {
  if (props.error !== EMAIL_ADDRESS_REQUIRED
    && props.error !== EMAIL_ADDRESS_INVALID
    && typeof props.error !== 'undefined') {
    if (props.error === '') {
      return (<FormErrorLabel error="" />);
    }
    return (
      <div className="error-span-container">
        <span
          className="error-span form-control-feedback hidden-xs-down"
        >
          {RES_REGISTER.errors['Email.Exists']}&nbsp;&nbsp;
          <span
            onClick={() => ModalActions.setModalType(LOGIN)}
            className="link link-span-login"
            role="button"
          >
            {RES_REGISTER.wantLogin}
          </span>
        </span>
      </div>
    );
  }

  return (
    <FormErrorLabel
      error={props.error}
      resource={RES_REGISTER.errors}
    />
  );
}

EmailErrorLabel.propTypes = {
  error: React.PropTypes.string,
};
