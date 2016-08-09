'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/container';
import AwesomePanel from './components/awesome-panel';

/**
 * Render to page
 */
ReactDOM.render(
  <Container>
    <AwesomePanel />
  </Container>,
  document.getElementById('content')
);