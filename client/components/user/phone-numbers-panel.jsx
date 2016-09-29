import React, { Component } from 'react';
import AddPhoneNumberPanel from './add-phone-number-panel';
import NumbersStore from '../../stores/phone-numbers-store';
import NumbersAction from '../../actions/phone-numbers-actions';
import MiscActions from '../../actions/misc-actions';
import PhoneNumbersDisplayText from './phone-number-display-text';

const ADD_PHONE_NUMBER_PANEL_ID = 'add-phone-number-panel';

export default class PhoneNumbersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPhoneNumberPanel: false,
      phoneNumbers: [],
    };

    this.toggleAddPhoneNumberPanel = this.toggleAddPhoneNumberPanel.bind(this);
    this.onChange = this.onChange.bind(this);
    NumbersStore.addChangeListener(this.onChange);
    // load existing phone numbers
    NumbersAction.getPhoneNumbers();
  }

  componentWillUnmount() {
    NumbersStore.addChangeListener(this.onChange);
  }

  onChange() {
    const numbers = NumbersStore.getPhoneNumbers();
    this.setState({
      phoneNumbers: numbers,
    });
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
        {this.state.phoneNumbers.map((p) => (
          <PhoneNumbersDisplayText
            countryCode={p.countryCode}
            number={p.number}
            isVerified={p.isVerified}
          />
        ))}
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
