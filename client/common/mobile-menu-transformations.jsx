import React from 'react';
import ReactDOM from 'react-dom';
import MobileMenu from '../components/navbar/mobile-menu';

const tempContainer = document.createElement('div');

ReactDOM.render(
  <MobileMenu
    toggler="btn-mobile-menu"
    id="mobile-menu"
  />, tempContainer);
const mobileMenu = document.getElementById('mobile-menu');
$(mobileMenu).replaceWith(tempContainer.querySelector('.mobile-menu'));
