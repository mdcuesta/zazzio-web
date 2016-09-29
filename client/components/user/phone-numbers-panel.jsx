import React, { Component } from 'react';
import Url from '../../helpers/url-helper';
import AddPhoneNumberPanel from './add-phone-number-panel';
import MiscActions from '../../actions/misc-actions';

const ADD_PHONE_NUMBER_PANEL_ID = 'add-phone-number-panel';

export default class PhoneNumbersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPhoneNumberPanel: false,
    };

    this.toggleAddPhoneNumberPanel = this.toggleAddPhoneNumberPanel.bind(this);
  }

  toggleAddPhoneNumberPanel() {
    $(`#${ADD_PHONE_NUMBER_PANEL_ID}`).animateCss('fadeIn');
    MiscActions.loadCountriesWithCallingCode();
    this.setState({
      showAddPhoneNumberPanel: !this.state.showAddPhoneNumberPanel,
    });
  }

  render() {
    return (
      <div
        className="col-sm-9"
        id="phone-numbers-panel"
      >
        <div className="input-group input-group-mobile">
          <span className="input-group-addon hidden-md-down">
            PH
          </span>
          <input
            type="text"
            className="form-control"
            disabled
          />
          <div className="input-group-addon verified text-left">
            <i className="fa fa-check-square-o" />
            &nbsp;Verified
          </div>
          <div className="input-group-addon input-group-delete">
            <a href={Url.action('user/profile/mobile-number/number/delete')}>
              <i className="fa fa-remove" />
            </a>
          </div>
        </div>
        <div className="input-group input-group-mobile">
          <span className="input-group-addon hidden-md-down">
            PH
          </span>
          <input
            type="text"
            className="form-control"
            disabled
          />
          <a
            className="input-group-addon unverified text-left"
            href={Url.action('user/profile/mobile-number/number/verify')}
          >
            <i className="fa fa-minus-square-o" />
            &nbsp;Verify
          </a>
          <div className="input-group-addon input-group-delete">
            <a href={Url.action('user/profile/mobile-number/number/delete')}>
              <i className="fa fa-remove" />
            </a>
          </div>
        </div>
        <div>
          <a
            href={`#${ADD_PHONE_NUMBER_PANEL_ID}`}
            className={`add-number-link${this.state.showAddPhoneNumberPanel ? ' hidden' : ''}`}
            data-toggle="collapse"
            aria-expanded="false"
            aria-controls={ADD_PHONE_NUMBER_PANEL_ID}
            onClick={this.toggleAddPhoneNumberPanel}
          >
            <i className="fa fa-plus" />&nbsp;Add a mobile number
          </a>
          <AddPhoneNumberPanel
            id={ADD_PHONE_NUMBER_PANEL_ID}
            onCancel={this.toggleAddPhoneNumberPanel}
          />
        </div>
      </div>
    );
  }
}
