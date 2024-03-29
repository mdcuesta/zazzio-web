import React from 'react';
import Url from '../helpers/url-helper';
import CommonLayout from '../common-layout';
import ResourceHelper from '../helpers/resource-helper';

/**
 * Register Complete View
 */
export default function Complete(props) {
  const RES_SIGNUP = ResourceHelper.getResource('sign-up-complete', props.locale);
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
      <div className="container">
        <div
          className={'box-control-container col-xs-12 col-sm-12 ' +
          'col-md-8 offset-md-2 col-lg-6 offset-lg-3'}
        >
          <div
            className={'box-control col-xs-12 col-sm-8 ' +
            'offset-sm-2 col-md-10 offset-md-1 col-lg-10 offset-lg-1'}
          >
            <h5 className="text-center">{RES_SIGNUP.accountCreated}</h5>
            <p className="text-center">
              {RES_SIGNUP.message}
            </p>
            <div className="form-group">
              <a
                className="btn btn-block btn-success btn-link-button"
                href={Url.action('')}
              >
                {RES_SIGNUP.continue}
              </a>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}

Complete.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,

  // default properties
  route: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
  authenticated: React.PropTypes.bool.isRequired,
  locale: React.PropTypes.string.isRequired,
};

Complete.defaultProps = {
  user: null,
  authenticated: false,
};
