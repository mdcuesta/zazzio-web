import React from 'react';
import DefaultLayout from './layout';

/**
 * Login View
 */
export default function Login(props) {
  return (
    <DefaultLayout title={props.title}>
      <h1>Login</h1>
    </DefaultLayout>
  );
}

Login.propTypes = {
  title: React.PropTypes.string.isRequired,
};
