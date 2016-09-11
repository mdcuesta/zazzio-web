import React from 'react';

export default function RightUnAuthenticatedButtons() {
  return (
    <div
      className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
      id="navbar-right"
    >
      <a
        href="/login"
        className="btn btn-primary"
      >
        Log In
      </a>
      <a
        href="/sign-up"
        className="btn btn-warning"
      >
        Sign Up
      </a>
    </div>
  );
}
