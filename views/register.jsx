import React from 'react';
import Url from './helpers/url-helper';
import DefaultLayout from './layout';
import NavBar from './components/navbar/navbar';
import SignUpControl from './components/account/signup-control';

/**
 * Register View
 */
export default function Register(props) {
  return (
    <DefaultLayout
      title="Sign up to experience awesome"
      jsbundle={Url.cdn('javascripts/sign-up.js')}
      cssbundle={Url.cdn('stylesheets/sign-up.css')}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      fixedTop={false}
    >
      <NavBar
        authenticated={props.authenticated}
        fixedTop={false}
      />
      <SignUpControl
        csrfToken={props.csrfToken}
        formValues={props.formValues}
      />
    </DefaultLayout>
  );
}

Register.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  authenticated: React.PropTypes.bool,
  formValues: React.PropTypes.object,
};

Register.defaultProps = {
  authenticated: false,
};
