import React from 'react';
import Url from '../../helpers/url-helper';
import FormErrorLabel from '../common/form-error-label';
import EmailErrorLabel from '../common/email-error-label';

export default function SignUpControl(props) {
  const postUrl = 'sign-up/local';
  const signUpFbUrl = 'sign-up/facebook';

  return (
    <div className="container-fluid">
      <div
        className={'box-control-container col-xs-12 col-sm-12 ' +
        'col-md-8 offset-md-2 col-lg-6 offset-lg-3'}
      >
        <div
          className={'box-control col-xs-12 col-sm-8 ' +
          'offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2'}
        >
          <section className="section-facebook-signup">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <a
                id="btn-signup-facebook"
                href={Url.action(signUpFbUrl)}
                className="btn btn-block btn-facebook btn-link-button"
              >
                <i className="fa fa-thumbs-o-up" />&nbsp;
                Sign up with Facebook
              </a>
            </div>
          </section>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="divider"><span>or</span></div>
          </div>
          <section className="section-signup">
            <form
              method="post"
              action={Url.action(postUrl)}
            >
              <div
                className={'col-sm-12 col-md-12 col-lg-12 '
                + `form-group ${(props.formValues.email.error !== '') ? 'has-danger' : ''}`}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={props.formValues.email.value}
                />
                <EmailErrorLabel
                  error={props.formValues.email.error}
                  existed={props.formValues.email.existed}
                />
              </div>
              <div
                className={'col-sm-12 col-md-12 col-lg-12 '
                + `form-group ${(props.formValues.password.error !== '') ? 'has-danger' : ''}`}
              >
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                />
                <FormErrorLabel error={props.formValues.password.error} />
              </div>
              <div
                className={'col-sm-12 col-md-12 col-lg-12 '
                + `form-group ${(props.formValues.firstName.error !== '') ? 'has-danger' : ''}`}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  name="firstName"
                  value={props.formValues.firstName.value}
                />
                <FormErrorLabel error={props.formValues.firstName.error} />
              </div>
              <div
                className={'col-sm-12 col-md-12 col-lg-12 '
                + `form-group ${(props.formValues.lastName.error !== '') ? 'has-danger' : ''}`}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  name="lastName"
                  value={props.formValues.lastName.value}
                />
                <FormErrorLabel error={props.formValues.lastName.error} />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 form-group text-align-center">
                <label
                  htmlFor="is-not-buyer"
                  className="form-check-label"
                >
                  <input
                    id="is-not-buyer"
                    type="checkbox"
                    className="form-check-input"
                    name="isSeller"
                    checked={props.formValues.isSeller.value}
                  />
                  &nbsp;I'm a landlord or an industry professional
                </label>
              </div>
              <input
                type="hidden"
                name="_csrf"
                value={props.csrfToken}
              />
              <div className="text-align-center form-group">
                <span className="link-span">By Signing up you agree to our&nbsp;
                  <a href={Url.action('terms')}>Terms</a> of use.
                </span>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12">
                <button
                  className="btn btn-block btn-primary"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>
          </section>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="divider plain" />
          </div>
          <section className="section-register">
            <div className="text-align-center">
              <span className="link-span">Already have an account?&nbsp;</span>
              <a
                href={Url.action('login')}
                className="link link-span"
              >
                Log in
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

SignUpControl.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  formValues: React.PropTypes.object,
};

SignUpControl.defaultProps = {
  formValues: {
    email: {
      value: '',
      error: '',
      existed: false,
    },
    password: {
      error: '',
    },
    firstName: {
      value: '',
      error: '',
    },
    lastName: {
      value: '',
      error: '',
    },
    isSeller: {
      value: false,
    },
  },
};

