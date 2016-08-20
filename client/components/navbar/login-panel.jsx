'use strict';

import React, {Component} from 'react';

export default class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register(modalType) {
    $('#panel-register-link').click();
  }

  render() {
    return (
      <div>
        <section className='section-regular-login'>
          <div className='small-12 medium-12 large-12'>
            <h5>Log in to experience awesome</h5>
          </div>
          <div className='small-12 medium-12 large-12'>
            <input type='text' 
                   placeholder='Email Address' />
          </div>      
          <div className='small-12 medium-12 large-12'>
            <input type='password' 
                   placeholder='Password' />
          </div>   
          <div className='small-12 medium-12 large-12 text-align-right'>
            <a href='javascript:void(0);'>Forgot Password</a>
          </div> 
          <div className='small-12 medium-12 large-12'>
            <button className='expanded z-musturd button modal-login-button' 
                    type='submit'>
                    Login
            </button>
          </div>   
        </section>  
        <section className='section-facebook-login'>
          <div className='divider'><span>or</span></div>
          <div className='small-12 medium-12 large-12'>
            <a href={'/login/facebook?return=' + encodeURI(window.location.href)} 
               className='expanded facebook-blue button modal-login-button'>
              <i className='fi-social-facebook login-facebook-icon'></i>
                    Log in with Facebook
            </a>
          </div> 
        </section>
        <section className='section-register'>
          <div className='small-12 medium-12 large-12'>
            <span>Don't have an account?&nbsp;</span>
            <a href='javascript:void(0);' onClick={this.register}>Sign Up</a>
          </div>
        </section>
      </div>
    );
  }
}