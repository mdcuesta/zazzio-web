import React from 'react';

export default function RightAuthenticatedButtons() {
  return (
    <div
      className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
      id="navbar-right"
    >
      <a
        href="/logout"
        type="button"
        className="btn btn-warning"
      >
        Log out
      </a>
    </div>
  );
}

