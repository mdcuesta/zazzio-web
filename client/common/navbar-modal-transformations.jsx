import React from 'react';
import ReactDOM from 'react-dom';
import { LoginLink, LoginDropdownLink } from '../components/navbar/login-link';
import { SignUpLink, SignUpDropdownLink } from '../components/navbar/register-link';
import UserMenuLink from '../components/navbar/user-menu-link';
import NavNotification from '../components/navbar/nav-item-notification';
import LoginModal from '../components/navbar/login-modal';

const tempContainer = document.createElement('div');
const authenticated = $('#authenticated').val() === 'true';

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
  const userMenuLink = $(document.getElementById('link-user-menu'));
  const imageId = userMenuLink.data('img-id');
  const altText = userMenuLink.data('img-alt');
  ReactDOM.render(<UserMenuLink
    image={imageId}
    alt={altText}
  />, tempContainer);
  userMenuLink.replaceWith(tempContainer.querySelector('#link-user-menu'));

  // replace user menu link with dropdown
  ReactDOM.render(<NavNotification />, tempContainer);
  const navItemNotification = document.getElementById('nav-item-notification');
  $(navItemNotification).replaceWith(tempContainer.querySelector('#nav-item-notification'));
}
