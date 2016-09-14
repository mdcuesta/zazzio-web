import React from 'react';

export default function RightUnAuthenticatedButtons() {
  return (
    <div
      className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
      id="navbar-right"
    >
      <ul className="nav navbar-nav hidden-md-down">
        <li className="nav-item">
          <a
            className="nav-link"
            href="/login"
          >
            Log in
          </a>
        </li>
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link"
            href="/sign-up"
          >
            Sign up
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="/help"
          >
            <i className="nav-help fa fa-large fa-question-circle-o" />
          </a>
        </li>
      </ul>
    </div>
  );
}
