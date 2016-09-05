import React, { Component } from 'react';

export default class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register() {
    $('#panel-register-link').click();
  }

  render() {
    return (
      <div>
        <section className="section-regular-login">
          <form
            method="post"
            action={`/auth/local?returnTo=${encodeURI(window.location.href)}`}
          >
            <div className="small-12 medium-12 large-12">
              <h5>Log in to experience awesome</h5>
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                type="text"
                placeholder="Email Address"
                name="email"
              />
            </div>
            <div className="small-12 medium-12 large-12">
              <input
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <div className="small-12 medium-12 large-12 text-align-right">
              <a href="/forgot-password">Forgot Password</a>
            </div>
            <div className="small-12 medium-12 large-12">
              <button
                className="expanded z-musturd button modal-login-button"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </section>
        <section className="section-facebook-login">
          <div className="divider"><span>or</span></div>
          <div className="small-12 medium-12 large-12">
            <a
              href={`/auth/facebook?returnTo=${encodeURI(window.location.href)}`}
              className="expanded facebook-blue button modal-login-button"
            >
              <i className="fi-social-facebook login-facebook-icon" />
                    Log in with Facebook
            </a>
          </div>
        </section>
        <section className="section-register">
          <div className="small-12 medium-12 large-12">
            <span className="content-span">Don"t have an account?&nbsp;</span>
            <a href="/sign-up" onClick={this.register}>Sign Up</a>
          </div>
        </section>
      </div>
    );
  }
}
