import React from 'react';
import Url from '../helpers/url-helper';
import CommonLayout from '../common-layout';
import ResourceHelper from '../helpers/resource-helper';

/**
 * SignUpCancel View
 */
export default function SignUpCancel(props) {
  const RES_CANCEL = ResourceHelper.getResource('sign-up-cancel', props.locale);

  return (
    <CommonLayout
      title={RES_CANCEL.title}
      scripts={[Url.cdn('javascripts/sign-up-cancel')]}
      styles={[Url.cdn('stylesheets/sign-up-cancel')]}
      authenticated={props.authenticated}
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
            <form
              method="post"
              action={Url.action(`sign-up/account/cancel/${props.confirmationCode}`)}
            >
              <h5 className="text-center">{RES_CANCEL.cancelSignUp}</h5>
              <p className="text-center">
                {RES_CANCEL.toCancelLabel}
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
                  {RES_CANCEL.continue}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}

SignUpCancel.propTypes = {
  confirmationCode: React.PropTypes.string.isRequired,
  csrfToken: React.PropTypes.string.isRequired,

  // default properties
  route: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
  authenticated: React.PropTypes.bool.isRequired,
  locale: React.PropTypes.string.isRequired,
};

SignUpCancel.defaultProps = {
  user: null,
  authenticated: false,
};
