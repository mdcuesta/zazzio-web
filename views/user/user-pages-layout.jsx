import React from 'react';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import UserNavBar from './components/user-navbar';
import Footer from '../common/default-footer';

export default function Dashboard(props) {
  return (
    <DefaultLayout
      title={props.title}
      jsbundle={props.jsbundle}
      cssbundle={props.cssbundle}
      authenticated
      csrfToken={props.csrfToken}
      fixedTop={false}
      includeCloudinaryMeta
    >
      <NavBar
        authenticated
        user={props.user}
        fixedTop={false}
      />
      <UserNavBar active={props.page} />
      <div
        className="container"
        role="main"
      >
        {props.children}
      </div>
      <Footer />
    </DefaultLayout>
  );
}

Dashboard.propTypes = {
  jsbundle: React.PropTypes.string,
  cssbundle: React.PropTypes.string,
  title: React.PropTypes.string,
  children: React.PropTypes.array,
  csrfToken: React.PropTypes.string,
  user: React.PropTypes.object.isRequired,
  page: React.PropTypes.string,
};

