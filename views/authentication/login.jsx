import React from 'react';
import Url from '../helpers/url-helper';
import CommonLayout from '../common-layout';
import LoginControl from './components/login-control';
import ResourceHelper from '../helpers/resource-helper';

/**
 * Login View
 */
export default function Login(props) {
  const RES_LOGIN = ResourceHelper.getResource('login', props.locale);

  return (
    <CommonLayout
      title={RES_LOGIN.title}
      scripts={[Url.cdn('javascripts/login')]}
      styles={[Url.cdn('stylesheets/login')]}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      fixedTop={false}
      locale={props.locale}
      route={props.route}
    >
      <LoginControl
        csrfToken={props.csrfToken}
        validEmail={props.validEmail}
        unconfirmed={props.unconfirmed}
        email={props.email}
        returnTo={props.returnTo}
        locale={props.locale}
      />
    </CommonLayout>
  );
}

Login.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  validEmail: React.PropTypes.bool,
  unconfirmed: React.PropTypes.bool,
  email: React.PropTypes.string,
  returnTo: React.PropTypes.string,

  // default properties
  route: React.PropTypes.string.isRequired,
  authenticated: React.PropTypes.bool.isRequired,
  locale: React.PropTypes.string.isRequired,
};

Login.defaultProps = {
  authenticated: false,
  validEmail: null,
  unconfirmed: false,
  email: null,
  returnTo: null,
};
