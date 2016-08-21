'use strict';

import React, {Component} from 'react';

export default class RegisterPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
       <section className='section-regular-sign-up'>
          <form method='post' action='/account/sign-up'>
            <div className='small-12 medium-12 large-12'>
              <h5>Sign up to experience awesome</h5>
            </div>
            <div className='small-12 medium-12 large-12'>
              <input type='text' 
                     placeholder='Email Address' />
            </div>     
            <div className='small-12 medium-12 large-12'>
              <input type='password' 
                     placeholder='Password' />
            </div> 
            <div className='small-12 medium-12 large-12'>
              <input type='text' 
                     placeholder='Firstname' />
            </div>   
            <div className='small-12 medium-12 large-12'>
              <input type='text' 
                     placeholder='Lastname' />
            </div>   
             <div className='small-12 medium-12 large-12'>
              <span>By clicking Sign Up you agree to our <a href='#'>Terms</a> of use.</span>
            </div>   
            <div className='small-12 medium-12 large-12'>
              <button className='expanded success button modal-login-button' 
                      type='submit'>
                      Sign Up
              </button>
            </div>  
          </form> 
        </section>
        <section className='section-facebook-sign-up'>
          <div className='divider'><span>or</span></div>
          <div className='small-12 medium-12 large-12'>
            <a href='#'
               className='expanded facebook-blue button modal-login-button'>
              <i className='fi-social-facebook login-facebook-icon'></i>
                    Sign Up with Facebook
            </a>
          </div> 
        </section>
      </div>
    );
  }
}