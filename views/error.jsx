import React from 'react';
import DefaultLayout from './layout';

/**
 * Error View
 */
export default function Error(props) {
  return (
    <DefaultLayout title="Error">
      <h1 className="error-message">{props.message}</h1>
      <h2 className="error-status">{props.error.status}</h2>
      <pre className="error-stack">
        {props.error.stack}
      </pre>
    </DefaultLayout>
  );
}

Error.propTypes = {
  message: React.PropTypes.string,
  error: React.PropTypes.object,
};
