import React from 'react';
import Url from '../helpers/url-helper';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import Footer from '../common/default-footer';
import SignUpControl from './components/signup-control';

/**
 * Sign Up Index View
 */
export default function Index(props) {
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
      <Footer />
    </DefaultLayout>
  );
}

Index.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  authenticated: React.PropTypes.bool,
  formValues: React.PropTypes.object,
};

Index.defaultProps = {
  authenticated: false,
};
