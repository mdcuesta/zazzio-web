import React from 'react';
import Url from '../helpers/url-helper';

export default function RightUnAuthenticatedButtons() {
  return (
    <div
      className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
      id="navbar-right"
    >
      <ul className="nav navbar-nav hidden-md-down">
        <li className="nav-item nav-item-list-property nav-item-separator">
          <a
            className="nav-link"
            href={Url.action('list-property')}
          >
            List Your Property
          </a>
        </li>
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link"
            href={Url.action('login')}
            id="link-login"
          >
            Log in
          </a>
        </li>
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link"
            href={Url.action('sign-up')}
            id="link-sign-up"
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
        <li className="nav-item nav-item-list-property nav-item-separator">
          <a
            className="nav-link"
            href={Url.action('list-property')}
          >
            List Your Property
          </a>
        </li>
        <li className="nav-item dropdown nav-item-separator">
          <a
            className="nav-link dropdown-toggle"
            href={Url.action('login')}
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="nav-icon fa fa-large fa-cog" />
          </a>
          <ul
            className="dropdown-menu dropdown-menu-right"
            role="menu"
          >
            <li>
              <a
                className="dropdown-item nav-link"
                href={Url.action('login')}
                id="dropdown-link-login"
              >
                Log in
              </a>
            </li>
            <li>
              <div className="dropdown-divider" />
            </li>
            <li>
              <a
                className="dropdown-item nav-link"
                href={Url.action('sign-up')}
                id="dropdown-link-sign-up"
              >
                Sign up
              </a>
            </li>
          </ul>
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
