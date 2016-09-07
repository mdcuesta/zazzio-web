import React from 'react';
import DefaultLayout from './layout';
import NavBar from './components/navbar';

/**
 * Index View
 */
export default function Index(props) {
  return (
    <DefaultLayout
      title={props.title}
      jsbundle="/javascripts/index.js"
      cssbundle="/stylesheets/index.css"
      authenticated={props.isUserAuthenticated}
    >
      <NavBar isUserAuthenticated={props.isUserAuthenticated} />
      <div id="home-search" />
      <div id="content" />
    </DefaultLayout>
  );
}

Index.propTypes = {
  title: React.PropTypes.string.isRequired,
  isUserAuthenticated: React.PropTypes.bool,
};
