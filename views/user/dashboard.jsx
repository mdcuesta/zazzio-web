import React from 'react';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import UserNavBar from './components/user-navbar';
import Footer from '../common/default-footer';
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
      <UserNavBar />
      <div className="container">
        <div className="row main-content">
          <div className="col-sm-12 col-md-12 col-lg-12" />
        </div>
      </div>
      <Footer />
    </DefaultLayout>
  );
}

Dashboard.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
};

