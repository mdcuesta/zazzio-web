'use strict';

import React, {Component} from 'react';
import DefaultLayout from './layout';

/**
 * Index View
 */
export default class Index extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const textFacebookLogin = 'Log in with Facebook';
    const hrefLogin = '/login/facebook';

    return(
      <DefaultLayout title={this.props.title} 
                     cssbundle="/stylesheets/style.css">
        <div id="content" className="container">
          <a href={hrefLogin} className="btn btn-primary btn-login-facebook" role="button">{textFacebookLogin}</a>
        </div>
      </DefaultLayout>
    );
  }
};