import React from 'react';
import DefaultLayout from './layout';
import Footer from './common/default-footer';
import NavBar from './common/navbar';
import MobileMenu from './common/mobile-menu';

export default function Layout(props) {
  return (
    <DefaultLayout
      title={props.title}
      scripts={props.scripts}
      styles={props.styles}
      authenticated={props.authenticated}
      csrfToken={props.csrfToken}
      fixedTop={props.fixedTop}
      includeCloudinaryMeta={props.includeCloudinaryMeta}
      includeFBAppId={props.includeFBAppId}
      locale={props.locale}
    >
      <NavBar
        authenticated={props.authenticated}
        user={props.user}
        locale={props.locale}
        fixedTop={props.fixedTop}
      />
      <MobileMenu />
      {props.children}
      <Footer
        locale={props.locale}
        route={props.route}
      />
    </DefaultLayout>
  );
}

Layout.propTypes = {
  scripts: React.PropTypes.array,
  styles: React.PropTypes.array,
  title: React.PropTypes.string,
  children: React.PropTypes.array,
  authenticated: React.PropTypes.bool,
  csrfToken: React.PropTypes.string,
  fixedTop: React.PropTypes.bool,
  includeCloudinaryMeta: React.PropTypes.bool,
  includeFBAppId: React.PropTypes.bool,
  locale: React.PropTypes.string,

  user: React.PropTypes.object,
  route: React.PropTypes.string.isRequired,
};

Layout.defaultProps = {
  authenticated: false,
  csrfToken: null,
  fixedTop: true,
  includeCloudinaryMeta: true,
  includeFBAppId: false,
  locale: 'en',
  user: null,
};
