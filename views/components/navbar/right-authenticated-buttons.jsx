import React from 'react';

export default function RightAuthenticatedButtons() {
  return (
    <div
      className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
      id="navbar-right"
    >
      <ul className="nav navbar-nav hidden-md-down">
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link"
            href="/logout"
          >
            Log out
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="/help"
          >
            <i className="nav-icon fa fa-large fa-question-circle-o" />
          </a>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right-md hidden-sm-down hidden-lg-up">
        <li className="nav-item">
          <a
            className="nav-link"
            href="/logout"
          >
            <i className="nav-icon fa fa-large fa-sign-out" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="/help"
          >
            <i className="nav-icon fa fa-large fa-question-circle-o" />
          </a>
        </li>
      </ul>
    </div>
  );
}

