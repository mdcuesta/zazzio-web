import React from 'react';
import UserPageLayout from './user-pages-layout';
import UserListingsMenu from './components/user-listings-menu';
import Url from '../helpers/url-helper';
import ResourceHelper from '../helpers/resource-helper';

export default function Listings(props) {
  const RES_LISTINGS = ResourceHelper.getResource('user-listings', props.locale);

  const headerText = RES_LISTINGS.listingStatusHeaders[props.listingType];

  return (
    <UserPageLayout
      title={RES_LISTINGS.title}
      scripts={[Url.cdn('javascripts/user-listings')]}
      styles={[Url.cdn('stylesheets/user-listings')]}
      csrfToken={props.csrfToken}
      user={props.user}
      page="listings"
      locale={props.locale}
      route={props.route}
    >
      <div className="row main-content">
        <div className="col-sm-12 col-md-4 col-lg-3">
          <UserListingsMenu
            active={props.listingType}
            locale={props.locale}
          />
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
          <div className="card">
            <div className="card-header">
              {headerText}
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
}

Listings.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  listingType: React.PropTypes.string.isRequired,

  // default properties
  route: React.PropTypes.string.isRequired,
  locale: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
};

Listings.defaultProps = {
  listingType: 'drafts',
};
