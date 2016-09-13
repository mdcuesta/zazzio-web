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
      title={props.title}
      jsbundle={Url.cdn('javascripts/home.js')}
      cssbundle={Url.cdn('stylesheets/home.css')}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
    >
      <NavBar authenticated={props.authenticated} />
      <div
        id="home-search"
        className="home-search home-search-banner"
      />
      <div id="content" />
    </DefaultLayout>
  );
}

Index.propTypes = {
  title: React.PropTypes.string,
  authenticated: React.PropTypes.bool,
  csrfToken: React.PropTypes.string,
};

Index.defaultProps = {
  title: '',
  authenticated: false,
  csrfToken: null,
};
