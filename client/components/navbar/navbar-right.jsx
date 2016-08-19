'use strict';

import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.reveal';

import React, {Component} from 'react';
import LoginModal from './login-modal';

export default class NavBarRight extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='title-bar-right' id='title-bar-right'>
        <button type='button' className='button' data-open='login-modal'>Login</button>
        <button type='button' className='z-musturd button hollow'>Register</button>
        <LoginModal />
      </div>
    );
  }
}