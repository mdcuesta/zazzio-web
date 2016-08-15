'use strict';

import './layout';
import '../node_modules/foundation-sites/dist/plugins/foundation.util.keyboard';
import '../node_modules/foundation-sites/dist/plugins/foundation.util.timerAndImageLoader';
import '../node_modules/foundation-sites/dist/plugins/foundation.tabs';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/container';
import AwesomePanel from './components/awesome-panel';

$(document).foundation();
/**
 * Render to page
 */
/*ReactDOM.render(
  <Container>
    <AwesomePanel />
  </Container>,
  document.getElementById('content')
);*/

