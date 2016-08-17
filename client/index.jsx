'use strict';

import './layout';
import '../node_modules/foundation-sites/dist/plugins/foundation.util.keyboard';
import '../node_modules/foundation-sites/dist/plugins/foundation.util.timerAndImageLoader';
import '../node_modules/foundation-sites/dist/plugins/foundation.tabs';

import React from 'react';
import ReactDOM from 'react-dom';
import HomeSearch from './components/home-search';

var homeSearch = document.createElement('div');
ReactDOM.render(<HomeSearch />, homeSearch);

document.body.replaceChild(homeSearch.querySelector("#home-search"), document.getElementById("home-search"));

$(document).foundation();

