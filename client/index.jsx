'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import HomeSearch from './components/home-search/home-search';
import NavBarRight from './components/navbar/navbar-right';

// home search banner
let homeSearch = document.createElement('div');
ReactDOM.render(<HomeSearch />, homeSearch);
document.body.replaceChild(homeSearch.querySelector('#home-search'), document.getElementById('home-search'));

// nav bar right
let navBarRight = document.createElement('div');
ReactDOM.render(<NavBarRight />, navBarRight);
let navBarRightContainer = document.getElementById('title-bar-right')
$(navBarRightContainer).replaceWith(navBarRight.querySelector('.title-bar-right'));

// initialize foundation
$(document).foundation();
