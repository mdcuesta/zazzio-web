import React from 'react';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import Footer from '../common/default-footer';
import Url from '../helpers/url-helper';
import ResourceHelper from '../helpers/resource-helper';

/**
 * Index View
 */
export default function Index(props) {
  const RES_HOME = ResourceHelper.getResource('home', props.locale);
  return (
    <DefaultLayout
      title={RES_HOME.title}
      scripts={[Url.cdn('javascripts/home')]}
      styles={[Url.cdn('stylesheets/home')]}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      locale={props.locale}
    >
      <NavBar
        authenticated={props.authenticated}
        user={props.user}
        locale={props.locale}
      />
      <div
        id="home-hero-container"
        className="home-hero animated fadeIn"
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
      <Footer locale={props.locale} />
    </DefaultLayout>
  );
}

Index.propTypes = {
  authenticated: React.PropTypes.bool,
  csrfToken: React.PropTypes.string,
  user: React.PropTypes.object,
  locale: React.PropTypes.string,
};

Index.defaultProps = {
  authenticated: false,
  csrfToken: null,
  user: null,
};
