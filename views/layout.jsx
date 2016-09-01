import React from 'react';

/**
 * Layout View
 */
export default function Layout(props) {
  const jsbundleScript = props.jsbundle != null
        ? (<script type="text/javascript" src={props.jsbundle} />)
        : null;
  const cssbundleScript = props.cssbundle != null
        ? (<link rel="stylesheet" href={props.cssbundle} />)
        : null;
  const title = props.title != null
        ? props.title : 'Zazzio';

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        {cssbundleScript}
      </head>
      <body>
        {props.children}
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
};

