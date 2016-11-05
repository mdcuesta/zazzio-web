import React from 'react';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import MobileMenu from '../common/mobile-menu';
// import UserNavBar from '../user/components/user-navbar';
import Url from '../helpers/url-helper';

export default function NewListing(props) {
  return (
    <DefaultLayout
      title="Create Listing - Wizard"
      scripts={[Url.cdn('javascripts/new-listing-wizard')]}
      styles={[Url.cdn('stylesheets/new-listing-wizard')]}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      locale={props.locale}
      fixedTop
      user={props.user}
      route={props.route}
    >
      <NavBar
        authenticated
        user={props.user}
        fixedTop
        locale={props.locale}
      />
      <MobileMenu />
      <div
        id="new-listing-wizard"
        className="wizard-wrapper"
      />
    </DefaultLayout>
  );
}

NewListing.propTypes = {
  authenticated: React.PropTypes.bool.isRequired,
  csrfToken: React.PropTypes.string.isRequired,

  locale: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
  route: React.PropTypes.string.isRequired,
};
