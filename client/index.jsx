import React from 'react';
import ReactDOM from 'react-dom';
import requestFilter from './filters';
import './facebook-sdk';
import './raven';
import HomeSearch from './components/home-search/home-search';
import UITransformations from './user-ui-transformations';

// execute request filter to add csrf in every request
requestFilter();

// home search banner
const homeSearch = document.createElement('div');
ReactDOM.render(<HomeSearch />, homeSearch);
document.body.replaceChild(
  homeSearch.querySelector('#home-search'), document.getElementById('home-search'));

const transformUI = UITransformations;
transformUI();

// initialize foundation
$(document).foundation();
