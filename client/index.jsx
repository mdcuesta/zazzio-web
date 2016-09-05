import React from 'react';
import ReactDOM from 'react-dom';
import HomeSearch from './components/home-search/home-search';
import UITransformations from './user-ui-transformations';

const transformUI = UITransformations;

// home search banner
const homeSearch = document.createElement('div');
ReactDOM.render(<HomeSearch />, homeSearch);
document.body.replaceChild(
  homeSearch.querySelector('#home-search'), document.getElementById('home-search'));

transformUI();

// initialize foundation
$(document).foundation();
