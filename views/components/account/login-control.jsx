import React from 'react';
import Url from '../../helpers/url-helper';
import FormErrorLabel from '../common/form-error-label';

export default function LoginControl(props) {
  let emailError = '';
  let passwordError = '';

  if (props.validEmail !== null) {
    if (props.validEmail === false) {
      emailError = 'Invalid email address';
    } else {
      passwordError = 'Invalid password';
    }
  }

  let postUrl = 'auth/local';
  let fbLoginUrl = 'auth/facebook';
  if (props.returnTo !== null) {
    postUrl += `?returnTo=${encodeURI(props.returnTo)}`;
    fbLoginUrl += `?returnTo=${encodeURI(props.returnTo)}`;
  }

  return (
    <div
      className={'box-control-container col-xs-12 col-sm-12 ' +
      'col-md-8 offset-md-2 col-lg-6 offset-lg-3'}
    >
      <div
        className={'box-control col-xs-12 col-sm-8 ' +
        'offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2'}
      >
        <section className="section-facebook-login">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <a
              id="btn-login-facebook"
              href={Url.action(fbLoginUrl)}
              className="btn btn-block btn-facebook btn-link-button"
            >
              <i className="fa fa-thumbs-o-up" />&nbsp;
              Log in with Facebook
            </a>
          </div>
        </section>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="divider"><span>or</span></div>
        </div>
        <section className="section-login">
          <form
            method="post"
            action={Url.action(postUrl)}
          >
            <div
              className={'col-sm-12 col-md-12 col-lg-12 '
              + `form-group ${(emailError !== '') ? 'has-danger' : ''}`}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                name="email"
                value={(emailError === '') ? props.email : ''}
              />
              <FormErrorLabel error={emailError} />
            </div>
            <div
              className={'col-sm-12 col-md-12 col-lg-12 '
              + `form-group ${(passwordError !== '') ? 'has-danger' : ''}`}
            >
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
              />
              <FormErrorLabel error={passwordError} />
            </div>
            <div className="col col-sm-12 col-md-12 col-lg-12 text-align-right form-group">
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
              value={props.csrfToken}
            />
            <div className="col-sm-12 col-md-12 col-lg-12">
              <button
                className="btn btn-block btn-success"
                type="submit"
              >
                Log in
              </button>
            </div>
          </form>
        </section>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="divider plain" />
        </div>
        <section className="section-register">
          <div className="text-align-center">
            <span className="link-span">Don"t have an account?&nbsp;</span>
            <a
              href={Url.action('sign-up')}
              className="link link-span"
            >
              Sign Up
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

LoginControl.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  validEmail: React.PropTypes.bool,
  email: React.PropTypes.string,
  returnTo: React.PropTypes.string,
};

LoginControl.defaultProps = {
  validEmail: null,
  email: null,
  returnTo: null,
};
