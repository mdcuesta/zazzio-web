import React from 'react';
import Url from '../../helpers/url-helper';
import ResourceHelper from '../../helpers/resource-helper';

export default function UserListingsMenu(props) {
  const RES_LISTINGS = ResourceHelper.getResource('user-listings', props.locale);

  return (
    <div className="card">
      <ul className="list-unstyled list-menu card-block" role="menu">
        <li>
          <a
            className={(props.active === 'all' ? 'active' : '')}
            href={Url.action('user/listings/all')}
          >
            {RES_LISTINGS.listingStatusMenu.all}
          </a>
        </li>
        <li>
          <a
            className={(props.active === 'drafts' ? 'active' : '')}
            href={Url.action('user/listings/drafts')}
          >
            {RES_LISTINGS.listingStatusMenu.drafts}
          </a>
        </li>
        <li>
          <a
            className={(props.active === 'active' ? 'active' : '')}
            href={Url.action('user/listings/active')}
          >
            {RES_LISTINGS.listingStatusMenu.active}
          </a>
        </li>
        <li className="side-menu-divider" />
        <li>
          <a
            className={(props.active === 'in-active' ? 'active' : '')}
            href={Url.action('user/listings/inactive')}
          >
            {RES_LISTINGS.listingStatusMenu.inactive}
          </a>
        </li>
      </ul>
      <div className="card-block">
        <a
          className="link-button"
          href={Url.action('listings/new/wizard')}
        >
          {RES_LISTINGS.createListing}
        </a>
      </div>
    </div>
  );
}

UserListingsMenu.propTypes = {
  active: React.PropTypes.string,
  locale: React.PropTypes.string.isRequired,
};
