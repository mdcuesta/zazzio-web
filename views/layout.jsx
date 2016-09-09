import React from 'react';

/**
 * Layout View
 */
export default function Layout(props) {
  const jsbundleScript = props.jsbundle !== null
    ? (<script type="text/javascript" src={props.jsbundle} />)
    : null;
  const cssbundleScript = props.cssbundle !== null
    ? (<link rel="stylesheet" href={props.cssbundle} />)
    : null;
  const title = props.title !== null
    ? props.title : 'Zazzio';
  const csrfMeta = props.csrfToken !== null
    ? (<meta name="csrf-token" content={props.csrfToken} />)
    : null;
  const fbIdMeta =
    (<meta name="fb-app-id" content={process.env.FB_CLIENT_ID || '606312066216240'} />);
  const ravenMeta =
    (<meta
      name="raven-client-key"
      content={process.env.SENTRY_PUBLIC_CLIENT_KEY ||
      'https://b821575399244c389156af415401c5f5@sentry.io/97962'}
    />);

  return (
    <html lang="en">
      <head>
        {csrfMeta}
        {fbIdMeta}
        {ravenMeta}
        <title>{title}</title>
        {cssbundleScript}
      </head>
      <body>
        {props.children}
        <input
          id="authenticated"
          type="hidden"
          value={(props.authenticated ? 'true' : 'false')}
        />
        {jsbundleScript}
      </body>
    </html>
  );
}

Layout.propTypes = {
  jsbundle: React.PropTypes.string,
  cssbundle: React.PropTypes.string,
  title: React.PropTypes.string,
  children: React.PropTypes.array,
  authenticated: React.PropTypes.bool,
  csrfToken: React.PropTypes.string,
};

Layout.defaultProps = {
  authenticated: false,
  csrfToken: null,
};
