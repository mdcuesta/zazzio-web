'use strict';

import '../../core';
import React, {Component} from 'react';

/**
 * LoginModalTabs
 */
export default class LoginModalTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul className='tabs' data-tabs id='example-tabs'>
          <li className='tabs-title is-active'>
            <a href='javascript:void(0);' aria-selected='true'>Tab 1</a>
          </li>
          <li className='tabs-title'>
            <a href="javascript:void(0);">Tab 2</a>
          </li>
        </ul>
        <div className='tabs-content' data-tabs-content='example-tabs'>
          <div className='tabs-panel is-active' id='panel1'>
            <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
          </div>
          <div className='tabs-panel' id='panel2'>
            <p>Suspendisse dictum feugiat nisl ut dapibus.  Vivamus hendrerit arcu sed erat molestie vehicula. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
          </div>
        </div>
      </div>
    );
  }
}