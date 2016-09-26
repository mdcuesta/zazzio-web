import React from 'react';
import Url from '../helpers/url-helper';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import Footer from '../common/default-footer';

/**
 * SignUpCancel View
 */
export default function SignUpCancel(props) {
  return (
    <DefaultLayout
      title="Cancel Sign Up - zazz.io"
      jsbundle={Url.cdn('javascripts/sign-up-cancel.js')}
      cssbundle={Url.cdn('stylesheets/sign-up-cancel.css')}
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
            <form
              method="post"
              action={Url.action(`sign-up/account/cancel/${props.confirmationCode}`)}
            >
              <h5 className="text-center">Cancel Sign Up</h5>
              <p className="text-center">
                To cancel sign up please key in your email address
              </p>
              <input
                type="hidden"
                name="_csrf"
                value={props.csrfToken}
              />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email address"
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-block btn-success btn-link-button"
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </DefaultLayout>
  );
}

SignUpCancel.propTypes = {
  user: React.PropTypes.object,
  authenticated: React.PropTypes.bool,
  confirmationCode: React.PropTypes.string.isRequired,
  csrfToken: React.PropTypes.string.isRequired,
};

SignUpCancel.defaultProps = {
  user: null,
  authenticated: false,
};
