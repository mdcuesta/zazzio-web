import React from 'react';
import Url from '../helpers/url-helper';
import DefaultLayout from '../layout';
import NavBar from '../components/navbar/navbar';

/**
 * Register Complete View
 */
export default function Complete(props) {
  return (
    <DefaultLayout
      title="Sign up complete"
      jsbundle={Url.cdn('javascripts/sign-up.js')}
      cssbundle={Url.cdn('stylesheets/sign-up.css')}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      fixedTop={false}
    >
      <NavBar
        authenticated={props.authenticated}
        fixedTop={false}
        user={props.user}
      />
      <div
        className={'box-control-container col-xs-12 col-sm-12 ' +
        'col-md-8 offset-md-2 col-lg-6 offset-lg-3'}
      >
        <div
          className={'box-control col-xs-12 col-sm-8 ' +
          'offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2'}
        >
          <h5 className="text-align-center">Your account has been successfully created.</h5>
          <p className="text-align-center">
            Please confirm your account by clicking the confirmation link
            that we sent to your email.  Thank you.
          </p>
          <div className="form-group">
            <a
              className="btn btn-block btn-success btn-link-button"
              href={Url.action('account')}
            >
              Continue
            </a>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

Complete.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  user: React.PropTypes.object,
  authenticated: React.PropTypes.bool,
};

Complete.defaultProps = {
  user: null,
  authenticated: false,
};
