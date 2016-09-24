import React from 'react';
import ReactDOM from 'react-dom';
import { LoginLink, LoginDropdownLink } from '../components/navbar/login-link';
import { SignUpLink, SignUpDropdownLink } from '../components/navbar/register-link';
import DropdownLink from '../components/navbar/dropdown-link';
import UserMenuLink from '../components/navbar/user-menu-link';
import NavNotification from '../components/navbar/nav-item-notification';
import LoginModal from '../components/navbar/login-modal';

const tempContainer = document.createElement('div');
const authenticated = $('#authenticated').val() === 'true';

// replace browse link with dropdown
ReactDOM.render(
  <DropdownLink
    id="link-browse"
    text="Browse"
    link="browse"
  />, tempContainer);
const browseLink = document.getElementById('link-browse');
$(browseLink).replaceWith(tempContainer.querySelector('#link-browse'));

// replace explore link with dropdown
ReactDOM.render(
  <DropdownLink
    id="link-explore"
    text="Areas"
    link="explore"
  />, tempContainer);
const exploreLink = document.getElementById('link-explore');
$(exploreLink).replaceWith(tempContainer.querySelector('#link-explore'));

if (!authenticated) {
  const LOGIN_MODAL_ID = 'login-modal';

  // replace login link with modal
  ReactDOM.render(<LoginLink loginModalId={LOGIN_MODAL_ID} />, tempContainer);
  const loginLink = document.getElementById('link-login');
  $(loginLink).replaceWith(tempContainer.querySelector('#link-login'));

  // replace dropdown login link with modal
  ReactDOM.render(<LoginDropdownLink loginModalId={LOGIN_MODAL_ID} />, tempContainer);
  const dropDownLoginLink = document.getElementById('dropdown-link-login');
  $(dropDownLoginLink).replaceWith(tempContainer.querySelector('#dropdown-link-login'));

  // replace sign-up link with modal
  ReactDOM.render(<SignUpLink loginModalId={LOGIN_MODAL_ID} />, tempContainer);
  const signUpLink = document.getElementById('link-sign-up');
  $(signUpLink).replaceWith(tempContainer.querySelector('#link-sign-up'));

  // replace dropdown sign-up link with modal
  ReactDOM.render(<SignUpDropdownLink loginModalId={LOGIN_MODAL_ID} />, tempContainer);
  const dropDownSignUpLink = document.getElementById('dropdown-link-sign-up');
  $(dropDownSignUpLink).replaceWith(tempContainer.querySelector('#dropdown-link-sign-up'));

  ReactDOM.render(<LoginModal id={LOGIN_MODAL_ID} />,
    document.getElementById('modals-container'));
} else {
  // replace user menu link with dropdown
  ReactDOM.render(<UserMenuLink />, tempContainer);
  const userMenuLink = document.getElementById('link-user-menu');
  $(userMenuLink).replaceWith(tempContainer.querySelector('#link-user-menu'));

  // replace user menu link with dropdown
  ReactDOM.render(<NavNotification />, tempContainer);
  const navItemNotification = document.getElementById('nav-item-notification');
  $(navItemNotification).replaceWith(tempContainer.querySelector('#nav-item-notification'));
}
