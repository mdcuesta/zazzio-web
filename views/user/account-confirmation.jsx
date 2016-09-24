import React from 'react';
import Url from '../helpers/url-helper';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import Footer from '../common/default-footer';

/**
 * AccountConfirmation View
 */
export default function AccountConfirmation(props) {
  return (
    <DefaultLayout
      title="Sign up confirmation - zazz.io"
      jsbundle={Url.cdn('javascripts/account-confirmation.js')}
      cssbundle={Url.cdn('stylesheets/account-confirmation.css')}
      authenticated={props.authenticated}
      fixedTop={false}
    >
      <NavBar
        authenticated={props.authenticated}
        fixedTop={false}
        user={props.user}
      />
      <div className="container">
        <div
          className={'box-control-container col-xs-12 col-sm-12 ' +
          'col-md-8 offset-md-2 col-lg-6 offset-lg-3'}
        >
          <div
            className={'box-control col-xs-12 col-sm-8 ' +
            'offset-sm-2 col-md-10 offset-md-1 col-lg-10 offset-lg-1'}
          >
            <h5 className="text-align-center">Your account has been confirmed.</h5>
            <p className="text-align-center">
              Thank you for confirming your account.
            </p>
            <div className="form-group">
              <a
                className="btn btn-block btn-success btn-link-button"
                href={Url.action('user/dashboard')}
              >
                Continue
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </DefaultLayout>
  );
}

AccountConfirmation.propTypes = {
  user: React.PropTypes.object,
  authenticated: React.PropTypes.bool,
};

AccountConfirmation.defaultProps = {
  user: null,
  authenticated: false,
};
