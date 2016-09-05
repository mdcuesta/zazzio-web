import React from 'react';
import ReactDOM from 'react-dom';
import NavBarRight from './components/navbar/navbar-right';

export default function () {
  const authenticated = $('#authenticated').val();
  if (authenticated === true) { /* eslinst-disable-line */
  } else {
    // nav bar right
    const navBarRight = document.createElement('div');
    ReactDOM.render(<NavBarRight />, navBarRight);
    const navBarRightContainer = document.getElementById('title-bar-right');
    $(navBarRightContainer).replaceWith(navBarRight.querySelector('.title-bar-right'));
  }
}

