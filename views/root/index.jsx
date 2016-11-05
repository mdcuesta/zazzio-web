import React from 'react';
import CommonLayout from '../common-layout';
import Url from '../helpers/url-helper';
import ResourceHelper from '../helpers/resource-helper';

/**
 * Index View
 */
export default function Index(props) {
  const RES_HOME = ResourceHelper.getResource('home', props.locale);
  return (
    <CommonLayout
      title={RES_HOME.title}
      scripts={[Url.cdn('javascripts/home')]}
      styles={[Url.cdn('stylesheets/home')]}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      locale={props.locale}
      includeFBAppId
      route={props.route}
      user={props.user}
    >
      <div
        id="home-hero-container"
        className="home-hero animated"
        role="banner"
      >
        <div className="hero-content col-sm-12 col-md-12 col-lg-12">
          <h1 className="m-x-auto">{RES_HOME.tagLine}</h1>
        </div>
      </div>
      <div
        className="content"
        role="main"
      />
    </CommonLayout>
  );
}

Index.propTypes = {
  csrfToken: React.PropTypes.string,

  // default properties
  authenticated: React.PropTypes.bool,
  user: React.PropTypes.object,
  locale: React.PropTypes.string,
  route: React.PropTypes.string.isRequired,
};

Index.defaultProps = {
  authenticated: false,
  csrfToken: null,
  user: null,
};
