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
      title={props.title}
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
  title: React.PropTypes.string.isRequired,
  authenticated: React.PropTypes.bool,
  csrfToken: React.PropTypes.string,
  validEmail: React.PropTypes.bool,
  email: React.PropTypes.string,
  returnTo: React.PropTypes.string,
};

Login.defaultProps = {
  title: '',
  authenticated: false,
  csrfToken: null,
  validEmail: null,
  email: null,
  returnTo: null,
};
