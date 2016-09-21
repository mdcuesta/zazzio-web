import React from 'react';
import Url from '../helpers/url-helper';

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
            href={Url.action('login')}
          >
            Log in
          </a>
        </li>
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link"
            href={Url.action('sign-up')}
          >
            Sign up
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href={Url.action('help')}
          >
            <i className=" nav-icon nav-help fa fa-large fa-question-circle-o" />
          </a>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right-md hidden-sm-down hidden-lg-up">
        <li className="nav-item">
          <a
            className="nav-link"
            href={Url.action('login')}
          >
            <i className="nav-icon fa fa-large fa-sign-in" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href={Url.action('sign-up')}
          >
            <i className="nav-icon fa fa-large fa-plus" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href={Url.action('help')}
          >
            <i className="nav-icon fa fa-large fa-question-circle-o" />
          </a>
        </li>
      </ul>
    </div>
  );
}
