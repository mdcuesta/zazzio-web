import React from 'react';
import Url from '../../helpers/url-helper';
import FormErrorLabel from '../../common/form-error-label';
import EmailErrorLabel from '../../common/email-error-label';
import ResourceHelper from '../../helpers/resource-helper';

export default function SignUpControl(props) {
  const RES_SIGNUP = ResourceHelper.getResource('sign-up', props.locale);

  const postUrl = 'sign-up/local';
  const signUpFbUrl = 'sign-up/facebook';

  return (
    <div className="container box-control-container-wrapper">
      <div
        className={'box-control-container col-xs-12 col-sm-12 ' +
        'col-md-8 offset-md-2 col-lg-6 offset-lg-3'}
      >
        <div
          className={'box-control col-xs-12 col-sm-8 ' +
          'offset-sm-2 col-md-10 offset-md-1 col-lg-10 offset-lg-1'}
        >
          <section className="section-facebook-signup">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <a
                id="btn-signup-facebook"
                href={Url.action(signUpFbUrl)}
                className="btn btn-block btn-facebook btn-link-button"
              >
                <i className="fa fa-thumbs-o-up" />&nbsp;
                {RES_SIGNUP.signUpWithFacebook}
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
                  placeholder={RES_SIGNUP.emailAddress}
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
                  placeholder={RES_SIGNUP.password}
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
                  placeholder={RES_SIGNUP.firstName}
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
                  placeholder={RES_SIGNUP.lastName}
                  name="lastName"
                  value={props.formValues.lastName.value}
                />
                <FormErrorLabel error={props.formValues.lastName.error} />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 form-group text-center">
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
                  &nbsp;{RES_SIGNUP.industryProfessional}
                </label>
              </div>
              <input
                type="hidden"
                name="_csrf"
                value={props.csrfToken}
              />
              <div className="text-center form-group">
                <span className="link-span">{RES_SIGNUP.bySigningUp}&nbsp;
                  <a href={Url.action('terms')}>{RES_SIGNUP.terms}</a> {RES_SIGNUP.ofUse}
                </span>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12">
                <button
                  className="btn btn-block btn-primary"
                  type="submit"
                >
                  {RES_SIGNUP.signUp}
                </button>
              </div>
            </form>
          </section>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="divider plain" />
          </div>
          <section className="section-register">
            <div className="text-center">
              <span className="link-span">{RES_SIGNUP.haveAnAccount}&nbsp;</span>
              <a
                href={Url.action('login')}
                className="link link-span"
              >
                {RES_SIGNUP.login}
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
  locale: React.PropTypes.string.isRequired,
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

