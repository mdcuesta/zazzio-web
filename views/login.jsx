import React from 'react';
import Url from './helpers/url-helper';
import DefaultLayout from './layout';
import NavBar from './components/navbar/navbar';
import LoginControl from './components/account/login-control';

/**
 * Login View
 */
export default function Login(props) {
  return (
    <DefaultLayout
      title="Log in to experience awesome"
      jsbundle={Url.cdn('javascripts/login.js')}
      cssbundle={Url.cdn('stylesheets/login.css')}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      fixedTop={false}
    >
      <NavBar
        authenticated={props.authenticated}
        fixedTop={false}
      />
      <LoginControl
        csrfToken={props.csrfToken}
        validEmail={props.validEmail}
        email={props.email}
        returnTo={props.returnTo}
      />
    </DefaultLayout>
  );
}

Login.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  authenticated: React.PropTypes.bool,
  validEmail: React.PropTypes.bool,
  email: React.PropTypes.string,
  returnTo: React.PropTypes.string,
};

Login.defaultProps = {
  authenticated: false,
  validEmail: null,
  email: null,
  returnTo: null,
};
