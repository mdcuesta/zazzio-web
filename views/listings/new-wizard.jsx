import React from 'react';
import DefaultLayout from '../layout';
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
      fixedTop={false}
    >
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
};
