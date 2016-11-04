import React from 'react';
import pjson from '../package.json';

const version = pjson.version;
const distributionUrl = process.env.CDN_DISTRIBUTION_URL || '';
const appUrl = process.env.APP_DOMAIN || '';

/**
 * Layout View
 */
export default function Layout(props) {
  const jsScripts = typeof props.scripts !== 'undefined'
    && props.scripts !== null && !(process.env.JS_OFF || false)
    ? props.scripts.map((s, i) => (
      typeof s.localized === 'undefined' || s.localized
      ? <script key={i} async type="text/javascript" src={`${s}-${props.locale}.js`} />
      : <script key={i} async type="text/javascript" src={`${s}.js`} />
    ))
    : null;

  const cssStyles = typeof props.styles !== 'undefined' && props.styles !== null
    ? props.styles.map((s, i) => (
      <link
        key={i}
        rel="stylesheet"
        type={(typeof s.type === 'undefined' ? 'text/css' : s.type)}
        href={`${s}.css`}
      />
    ))
    : null;

  const title = props.title !== null
    ? props.title : 'Zazzio';

  const csrfMeta = props.csrfToken !== null
    ? (<meta name="csrf-token" content={props.csrfToken} />)
    : null;

  const fbIdMeta = props.includeFBAppId ?
    (<meta name="fb-app-id" content={process.env.FB_CLIENT_ID || '606312066216240'} />)
    : '';

  const ravenMeta =
    (<meta
      name="raven-client-key"
      content={process.env.SENTRY_PUBLIC_CLIENT_KEY ||
      'https://b821575399244c389156af415401c5f5@sentry.io/97962'}
    />);

  const versionMeta =
    (<meta
      name="app-version"
      content={version}
    />);

  const cdnMeta =
    (<meta
      name="distribution-url"
      content={distributionUrl}
    />);

  const appUrlMeta =
    (<meta
      name="app-url"
      content={appUrl}
    />);


  const cloudinaryMeta = props.includeCloudinaryMeta ?
    (<meta
      name="cloudinary_cloud_name"
      content={process.env.CLOUDINARY_CLOUD_NAME || 'hrhmiavwh'}
    />)
    : '';

  let bodyClassName = '';
  if (props.fixedTop) {
    bodyClassName = 'body-fixed-top';
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {versionMeta}
        {cdnMeta}
        {appUrlMeta}
        {csrfMeta}
        {fbIdMeta}
        {ravenMeta}
        {cloudinaryMeta}
        <title>{title}</title>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
        {cssStyles}
      </head>
      <body className={bodyClassName}>
        {props.children}
        <input
          id="authenticated"
          type="hidden"
          value={(props.authenticated ? 'true' : 'false')}
        />
        <div id="modals-container" />
        {jsScripts}
      </body>
    </html>
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
};

Layout.defaultProps = {
  authenticated: false,
  csrfToken: null,
  fixedTop: true,
  includeCloudinaryMeta: true,
  includeFBAppId: false,
  locale: 'en',
};
