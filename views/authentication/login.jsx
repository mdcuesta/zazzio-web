import React from 'react';
import Url from '../helpers/url-helper';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import Footer from '../common/default-footer';
import LoginControl from './components/login-control';
import ResourceHelper from '../helpers/resource-helper';

/**
 * Login View
 */
export default function Login(props) {
  const RES_LOGIN = ResourceHelper.getResource('login', props.locale);

  return (
    <DefaultLayout
      title={RES_LOGIN.title}
      scripts={[Url.cdn('javascripts/login')]}
      styles={[Url.cdn('stylesheets/login')]}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      fixedTop={false}
      locale={props.locale}
    >
      <NavBar
        authenticated={props.authenticated}
        fixedTop={false}
        locale={props.locale}
      />
      <LoginControl
        csrfToken={props.csrfToken}
        validEmail={props.validEmail}
        unconfirmed={props.unconfirmed}
        email={props.email}
        returnTo={props.returnTo}
      />
      <Footer />
    </DefaultLayout>
  );
}

Login.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  authenticated: React.PropTypes.bool,
  validEmail: React.PropTypes.bool,
  unconfirmed: React.PropTypes.bool,
  email: React.PropTypes.string,
  returnTo: React.PropTypes.string,
  locale: React.PropTypes.string,
};

Login.defaultProps = {
  authenticated: false,
  validEmail: null,
  unconfirmed: false,
  email: null,
  returnTo: null,
};
