'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import HomeSearch from './components/home-search/home-search';

var homeSearch = document.createElement('div');
ReactDOM.render(<HomeSearch />, homeSearch);
document.body.replaceChild(homeSearch.querySelector("#home-search"), document.getElementById('home-search'));


$('#home-search').foundation();
