import React from 'react';
import ModalActions from '../../actions/login-modal-actions';

const LOGIN = 'login';
const REGISTER = 'register';
const LOGIN_MODAL_ID = 'login-modal';

export default function NavBarRight() {
  return (
    <div
      className="pull-xs-right pull-sm-right pull-md-right pull-lg-right navbar-right"
      id="navbar-right"
    >
      <ul className="nav navbar-nav hidden-md-down">
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link nav-list-property"
            href="/list-property"
          >
            List Your Property
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="modal"
            data-target={`#${LOGIN_MODAL_ID}`}
            data-backdrop="static"
            onClick={() => ModalActions.setModalType(LOGIN)}
            href="/login"
          >
            Log in
          </a>
        </li>
        <li className="nav-item nav-item-separator">
          <a
            className="nav-link"
            data-toggle="modal"
            data-target={`#${LOGIN_MODAL_ID}`}
            data-backdrop="static"
            onClick={() => ModalActions.setModalType(REGISTER)}
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
            <i className="nav-icon fa fa-large fa-question-circle-o" />
          </a>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right-md hidden-sm-down hidden-lg-up">
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="modal"
            data-target={`#${LOGIN_MODAL_ID}`}
            data-backdrop="static"
            onClick={() => ModalActions.setModalType(LOGIN)}
            href="/login"
          >
            <i className="nav-icon fa fa-large fa-sign-in" />
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="modal"
            data-target={`#${LOGIN_MODAL_ID}`}
            data-backdrop="static"
            onClick={() => ModalActions.setModalType(REGISTER)}
            href="/sign-up"
          >
            <i className="nav-icon fa fa-large fa-plus" />
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
