import React, { Component } from 'react';
import Url from '../../helpers/url-helper';

export default class AddPhoneNumberPanel extends Component {
  constructor(props) {
    super(props);
    this.verify = this.verify.bind(this);
  }

  verify() {

  }

  render() {
    return (
      <div
        className="col-xs-12 col-sm-12 collapse add-phone-number-panel"
        id={this.props.id}
      >
        <div className="form-group">
          <label htmlFor="phone-country">Country</label>
          <select
            className="form-control"
            id="phone-country"
          >
            <option>Philippines</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phone-number">Mobile Number</label>
          <div className="input-group">
            <span className="input-group-addon hidden-md-down">
              +63
            </span>
            <input
              type="text"
              className="form-control"
              id="phone-number"
            />
          </div>
        </div>
        <button className="btn btn-success">Verify</button>
        <a
          href={Url.action('user/mobile/why-verify')}
          className="pull-right why-verify-link"
        >
          Why Verify?
        </a>
      </div>
    );
  }
}

AddPhoneNumberPanel.propTypes = {
  id: React.PropTypes.string.isRequired,
};
