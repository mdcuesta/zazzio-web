import React, { Component } from 'react';
import MotionUI from 'motion-ui';
import AddPhoneNumberPanel from './add-phone-number-panel';
import NumbersStore from '../../stores/phone-numbers-store';
import NumbersAction from '../../actions/phone-numbers-actions';
import MiscAction from '../../actions/misc-actions';
import PhoneNumbersDisplayText from './phone-number-display-text';

const RES_NUMBER = require(`../../localization/${process.env.LOCALE}/user-phone-numbers`);
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
    NumbersAction.getMobileNumbers();
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

  toggleAddPhoneNumberPanel(reloadNumbers = false) {
    MiscAction.loadCountriesWithCallingCode();

    const toggle = () => {
      this.setState({
        showAddPhoneNumberPanel: !this.state.showAddPhoneNumberPanel,
      });

      if (reloadNumbers) {
        NumbersAction.getMobileNumbers();
      }
    };

    if (!this.state.showAddPhoneNumberPanel) {
      MotionUI.animateIn(`#${ADD_PHONE_NUMBER_PANEL_ID}`, 'fade-in');
      toggle();
    } else {
      MotionUI.animateOut(`#${ADD_PHONE_NUMBER_PANEL_ID}`, 'fade-out', toggle);
    }
  }

  render() {
    return (
      <div
        className="col-sm-9"
        id="phone-numbers-panel"
      >
        {this.state.phoneNumbers.map((p, i) => (
          <PhoneNumbersDisplayText
            number={p.number}
            isVerified={p.isVerified}
            key={i}
            index={i}
          />
        ))}
        <div>
          <a
            role="button"
            className={`add-number-link${this.state.showAddPhoneNumberPanel ? ' hidden' : ''}`}
            aria-expanded="false"
            aria-controls={ADD_PHONE_NUMBER_PANEL_ID}
            onClick={() => this.toggleAddPhoneNumberPanel()}
          >
            <i className="fa fa-plus" />&nbsp;{RES_NUMBER.addMobileNumber}
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
