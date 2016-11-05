import React from 'react';
import Url from '../helpers/url-helper';
import CommonLayout from '../common-layout';
import SignUpControl from './components/signup-control';
import ResourceHelper from '../helpers/resource-helper';

/**
 * Sign Up Index View
 */
export default function Index(props) {
  const RES_SIGNUP = ResourceHelper.getResource('sign-up', props.locale);

  return (
    <CommonLayout
      title={RES_SIGNUP.title}
      scripts={[Url.cdn('javascripts/sign-up')]}
      styles={[Url.cdn('stylesheets/sign-up')]}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      fixedTop={false}
      locale={props.locale}
      route={props.route}
    >
      <SignUpControl
        csrfToken={props.csrfToken}
        formValues={props.formValues}
        locale={props.locale}
      />
    </CommonLayout>
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
