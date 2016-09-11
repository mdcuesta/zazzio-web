import React from 'react';
import ReactDOM from 'react-dom';
import NavBarRight from './components/navbar/navbar-right';


const authenticated = $('#authenticated').val() === 'true';
if (!authenticated) {
  const navBarRight = document.createElement('div');
  ReactDOM.render(<NavBarRight />, navBarRight);
  const navBarRightContainer = document.getElementById('navbar-right');
  $(navBarRightContainer).replaceWith(navBarRight.querySelector('.navbar-right'));
}

