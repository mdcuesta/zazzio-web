import React from 'react';
import DefaultLayout from './layout';
import NavBar from './components/navbar/navbar';
import Url from './helpers/url-helper';

/**
 * Index View
 */
export default function Index(props) {
  return (
    <DefaultLayout
      title="Zazzio - Property Finder"
      jsbundle={Url.cdn('javascripts/home.js')}
      cssbundle={Url.cdn('stylesheets/home.css')}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
    >
      <NavBar authenticated={props.authenticated} />
      <div
        id="home-hero-container"
        className="home-hero animated fadeIn"
      >
        <div className="hero-content col-sm-12 col-md-12 col-lg-12">
          <h1 className="m-x-auto">Your dream home awaits</h1>
        </div>
      </div>
      <div id="content" />
    </DefaultLayout>
  );
}

Index.propTypes = {
  authenticated: React.PropTypes.bool,
  csrfToken: React.PropTypes.string,
};

Index.defaultProps = {
  authenticated: false,
  csrfToken: null,
};
