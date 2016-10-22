import React from 'react';
import DefaultLayout from '../layout';
import NavBar from '../common/navbar';
import UserNavBar from './components/user-navbar';
import Footer from '../common/default-footer';

export default function Dashboard(props) {
  return (
    <DefaultLayout
      title={props.title}
      scripts={props.scripts}
      styles={props.styles}
      authenticated
      csrfToken={props.csrfToken}
      fixedTop={false}
      includeCloudinaryMeta
      locale={props.locale}
    >
      <NavBar
        authenticated
        user={props.user}
        fixedTop={false}
        locale={props.locale}
      />
      <UserNavBar
        active={props.page}
        locale={props.locale}
      />
      <div
        className="container"
        role="main"
      >
        {props.children}
      </div>
      <Footer locale={props.locale} />
    </DefaultLayout>
  );
}

Dashboard.propTypes = {
  scripts: React.PropTypes.string,
  styles: React.PropTypes.string,
  title: React.PropTypes.string,
  children: React.PropTypes.array,
  csrfToken: React.PropTypes.string,
  user: React.PropTypes.object.isRequired,
  page: React.PropTypes.string,
  locale: React.PropTypes.string.isRequired,
};

