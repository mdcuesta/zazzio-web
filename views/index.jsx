import React from 'react';
import DefaultLayout from './layout';
import NavBar from './components/navbar/navbar';
import CDN from '../utilities/cdn';

/**
 * Index View
 */
export default function Index(props) {
  return (
    <DefaultLayout
      title={props.title}
      jsbundle={CDN.url('javascripts/home.js')}
      cssbundle={CDN.url('stylesheets/home.css')}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
    >
      <NavBar authenticated={props.authenticated} />
      <div id="home-search" />
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
