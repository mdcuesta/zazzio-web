import React from 'react';
import Url from '../helpers/url-helper';
import CommonLayout from '../common-layout';
import ResourceHelper from '../helpers/resource-helper';

/**
 * AccountConfirmation View
 */
export default function AccountConfirmation(props) {
  const RES_CONFIRM = ResourceHelper.getResource('sign-up-confirm', props.locale);
  return (
    <CommonLayout
      title={RES_CONFIRM.title}
      scripts={[Url.cdn('javascripts/account-confirmation')]}
      styles={[Url.cdn('stylesheets/account-confirmation')]}
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
            <h5 className="text-center">{RES_CONFIRM.accountConfirmed}</h5>
            <p className="text-center">
              {RES_CONFIRM.thankYou}
            </p>
            <div className="form-group">
              <a
                className="btn btn-block btn-success btn-link-button"
                href={Url.action('user/dashboard')}
              >
                {RES_CONFIRM.continue}
              </a>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}

AccountConfirmation.propTypes = {
  // default properties
  route: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
  authenticated: React.PropTypes.bool.isRequired,
  locale: React.PropTypes.string.isRequired,
};

AccountConfirmation.defaultProps = {
  user: null,
  authenticated: false,
};
