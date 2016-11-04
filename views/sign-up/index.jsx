import React from 'react';
import Url from '../helpers/url-helper';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import Footer from '../common/default-footer';
import SignUpControl from './components/signup-control';
import ResourceHelper from '../helpers/resource-helper';

/**
 * Sign Up Index View
 */
export default function Index(props) {
  const RES_SIGNUP = ResourceHelper.getResource('sign-up', props.locale);

  return (
    <DefaultLayout
      title={RES_SIGNUP.title}
      scripts={[Url.cdn('javascripts/sign-up')]}
      styles={[Url.cdn('stylesheets/sign-up')]}
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
      <SignUpControl
        csrfToken={props.csrfToken}
        formValues={props.formValues}
        locale={props.locale}
      />
      <Footer
        locale={props.locale}
        route={props.route}
      />
    </DefaultLayout>
  );
}

Index.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  formValues: React.PropTypes.object,

  // default properties
  route: React.PropTypes.string.isRequired,
  authenticated: React.PropTypes.bool.isRequired,
  locale: React.PropTypes.string.isRequired,
};

Index.defaultProps = {
  authenticated: false,
};
