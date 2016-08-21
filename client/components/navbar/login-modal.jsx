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
    this.state = {
      modalSize: 'tiny'
    };
    this.closeModal = this.closeModal.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  closeModal() {
    $('#login-modal').foundation('close');
  }

  componentDidMount() {
    let me = this;
    $(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
      let modalSize = 'tiny';
      if(newSize === 'small' || newSize === 'medium') {
        modalSize = 'small';
      }
      me.setState({
        modalSize: modalSize
      });
    });
  }

  
  render() {
    let modalSize = 'small';
    if (Foundation.MediaQuery.atLeast('large')) {
      modalSize = 'tiny';
    }
    return(
      <div className={this.state.modalSize + ' reveal'} 
           id='login-modal' 
           data-animation-in='fade-in' 
           data-animation-out='fade-out' 
           data-close-on-click='false'
           data-reveal>
        <LoginModalTabs modalType={this.props.modalType} />
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