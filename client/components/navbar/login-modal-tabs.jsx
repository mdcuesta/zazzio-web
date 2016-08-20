'use strict';

import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.tabs';
import React, {Component} from 'react';
import LoginPanel from './login-panel';
import RegisterPanel from './register-panel';

const LOGIN = 'Login';
const REGISTER = 'Sign Up';

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
        <ul className='tabs login-modal-tabs' 
            data-tabs id='login-modal-tabs'>
          <li className={'tabs-title' + (this.props.modalType === 'login' ? ' is-active' : '')}>
            <a href='#panel-login' 
               aria-selected={this.props.modalType === 'login'}>
                {LOGIN}
            </a>
          </li>
          <li className={'tabs-title' + (this.props.modalType === 'register' ? ' is-active' : '')}>
            <a href='#panel-register'
               aria-selected={this.props.modalType === 'register'}
               id='panel-register-link'>
                {REGISTER}
            </a>
          </li>
        </ul>
        <div className='tabs-content login-modal-tabs-content' 
             data-tabs-content='login-modal-tabs'>
          <div className={'tabs-panel' + (this.props.modalType === 'login' ? ' is-active' : '')} 
               id='panel-login'>
            <LoginPanel />
          </div>
          <div className={'tabs-panel' + (this.props.modalType === 'register' ? ' is-active' : '')} 
               id='panel-register'>
            <RegisterPanel />
          </div>
        </div>
      </div>
    );
  }
}