'use strict';

import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.reveal';

import React, {Component} from 'react';
import LoginModalTabs from './login-modal-tabs';

/**
 * LoginModal
 */
export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    $('#login-modal').foundation('close');
  }
  render() {
    return(
      <div className='tiny reveal' 
           id='login-modal' 
           data-animation-in='fade-in' 
           data-animation-out='fade-out' 
           data-close-on-click='false'
           data-reveal>
        <LoginModalTabs />
        <button className='close-button' 
                aria-label='Close Login Modal' 
                type='button'
                onClick={this.closeModal}>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    );  
  }
}