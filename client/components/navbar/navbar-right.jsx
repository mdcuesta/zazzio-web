'use strict';

import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.reveal';

import React, {Component} from 'react';
import LoginModal from './login-modal';

const LOGIN = 'login';
const REGISTER = 'register';

export default class NavBarRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: LOGIN
    }
    this.setModalType = this.setModalType.bind(this);
  }

  setModalType(modalType) {
    this.setState({
      modalType: modalType
    });
  }

  render() {
    return(
      <div className='title-bar-right' id='title-bar-right'>
        <button type='button' 
                className='button' 
                data-open='login-modal'
                onClick={() => this.setModalType(LOGIN)}>Login</button>
        <button type='button' 
                className='z-musturd button hollow' 
                data-open='login-modal'
                onClick={() => this.setModalType(REGISTER)}>Sign Up</button>
        <LoginModal modalType={this.state.modalType} />
      </div>
    );
  }
}