'use strict';

import React,{Component} from 'react';

/**
 * Layout View
 */
export default class Layout extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const jsbundleScript = this.props.jsbundle != null 
          ? (<script type='text/javascript' src={this.props.jsbundle}></script>) 
          : null;
    const cssbundleScript = this.props.cssbundle != null 
          ? (<link rel='stylesheet' href={this.props.cssbundle} />) 
          : null;
    const title = this.props.title != null 
          ? this.props.title : 'Zazzio';

    return(
      <html>
        <head>
          <title>{title}</title>
          {cssbundleScript}
        </head>
        <body>
          {this.props.children}
          {jsbundleScript}
        </body>
      </html>
    );
  }
};