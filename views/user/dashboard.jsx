import React from 'react';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import Url from '../helpers/url-helper';

export default function Dashboard(props) {
  return (
    <DefaultLayout
      title="Dashboard - Zazzio"
      jsbundle={Url.cdn('javascripts/user-dashboard.js')}
      cssbundle={Url.cdn('stylesheets/user-dashboard.css')}
      authenticated
      csrfToken={props.csrfToken}
      fixedTop={false}
    >
      <NavBar
        authenticated
        user={props.user}
        fixedTop={false}
      />
    </DefaultLayout>
  );
}

Dashboard.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
};

