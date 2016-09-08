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

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        {csrfMeta}
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
