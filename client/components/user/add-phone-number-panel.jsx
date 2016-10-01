import React, { Component } from 'react';
import Validator from 'validator';
import Url from '../../helpers/url-helper';
import Store from '../../stores/misc-store';
import NumbersStore from '../../stores/phone-numbers-store';
import NumbersAction from '../../actions/phone-numbers-actions';
import FormErrorLabel from '../common/form-error-label';
import Status from './status';

const validator = Validator;
const getStatus = Status;
const RESEND_TIMEOUT = 300000;

export default class AddPhoneNumberPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      selectedCountryCode: 'PH',
      selectedCountryCallingCode: '63',
      number: '',
      error: '',
      forVerification: false,
      verificationCode: '',
      numberHasError: false,
      verificationCodeHasError: false,
      showResend: false,
      event: '',
    };
    this.verify = this.verify.bind(this);
    this.add = this.add.bind(this);
    this.addOrVerify = this.addOrVerify.bind(this);
    this.countryChange = this.countryChange.bind(this);
    this.verificationCodeChange = this.verificationCodeChange.bind(this);
    this.numberChange = this.numberChange.bind(this);
    this.numberBlur = this.numberBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCountriesChange = this.onCountriesChange.bind(this);
    this.resendVerification = this.resendVerification.bind(this);
    Store.addChangeListener(this.onCountriesChange);
    NumbersStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onCountriesChange);
    NumbersStore.removeChangeListener(this.onChange);
  }

  onCountriesChange() {
    const countries = Store.getCountriesWithCallingCode();
    this.setState({
      countries,
    });
  }

  onChange() {
    /**
     * Status
     * 0 - Success
     * 1 - Number exists
     * 2 - Number does not exist
     * 3 - Verification Request Failed
     * 4 - Verification Failed
     */

    // resend only
    if (this.state.event === 'resend') {
      const status = NumbersStore
        .getResendVerificationStatus(this.state.number);

      const error = this.getError(status);

      if (status !== 0) {
        this.setState({
          error,
        });
      }
      return;
    }

    // not for verification yet
    if (!this.state.forVerification) {
      const status = NumbersStore.getAddMobileNumberStatus();
      const forVerification = status === 0 && this.state.number !== '';
      const error = this.getError(status);

      this.setState({
        error,
        forVerification,
        numberHasError: error !== '',
      });

      if (error !== '') {
        $('#phone-number').focus();
      }
      return;
    }


    // verify button clicked
    const status = NumbersStore
    .getVerifyMobileNumberStatus(`${this.state.selectedCountryCallingCode}${this.state.number}`);
    const error = this.getError(status);

    if (status === 0) {
      this.setState({
        selectedCountryCode: 'PH',
        selectedCountryCallingCode: '63',
        number: '',
        error: '',
        forVerification: false,
        verificationCode: '',
        numberHasError: false,
        verificationCodeHasError: false,
      });
      this.props.onCancel(true);
      $(`#${this.props.id}`).collapse('toggle');
    } else {
      this.setState({
        error,
        verificationCodeHasError: error !== '',
      });
      $('#verification-code').focus();
    }
  }

  getError(status) {
    return getStatus(status);
  }

  addOrVerify() {
    if (!this.state.forVerification) {
      this.add();
    } else {
      this.verify();
    }
  }

  add() {
    const txtNumber = $('#phone-number');
    if (this.state.number.trim() === '') {
      this.setState({
        error: 'Mobile number is required.',
        numberHasError: true,
      });
      txtNumber.focus();
    } else if (!validator.isInt(this.state.number.trim(), { allow_leading_zeroes: true })) {
      this.setState({
        error: 'Invalid mobile number.',
        numberHasError: true,
      });
      txtNumber.focus();
    } else {
      this.setState({
        error: '',
        numberHasError: false,
      });

      setTimeout(() => {
        this.setState({
          showResend: true,
        });
      }, RESEND_TIMEOUT);

      NumbersAction.addMobileNumber(`${this.state.selectedCountryCallingCode}${this.state.number}`);
    }
  }


  verify() {
    if (this.state.verificationCode.trim() === '') {
      this.setState({
        error: 'Verification code is required.',
        verificationCodeHasError: true,
        event: '',
      });
      $('#verification-code').focus();
      return;
    }

    this.setState({
      event: '',
    });
    NumbersAction.verifyMobileNumber(`${this.state.selectedCountryCallingCode}${this.state.number}`,
      this.state.verificationCode);
  }

  resendVerification(e) {
    NumbersAction.resendMobileNumberVerification(this.state.number);
    this.setState({
      event: 'resend',
      showResend: false,
    });

    setTimeout(() => {
      this.setState({
        showResend: true,
      });
    }, RESEND_TIMEOUT);

    e.preventDefault();
  }

  countryChange(e) {
    const country = this.state.countries.find(c => c.ISO2Code === e.target.value);
    this.setState({
      selectedCountryCode: e.target.value,
      selectedCountryCallingCode: country.callingCode,
    });
  }

  numberChange(e) {
    this.setState({
      number: e.target.value,
      numberHasError: false,
      error: '',
    });
  }

  numberBlur(e) {
    this.setState({
      number: e.target.value.replace(/^0+/, ''),
    });
  }

  verificationCodeChange(e) {
    this.setState({
      verificationCode: e.target.value,
    });
  }

  cancelSubmit(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  render() {
    let verificationCodeClass = `form-group${(this.state.forVerification ? '' : ' hidden')}`;
    verificationCodeClass += this.state.verificationCodeHasError ? ' has-danger' : '';

    let numberClass = `form-group${this.state.numberHasError ? ' has-danger' : ''}`;
    numberClass += this.state.forVerification ? ' hidden' : '';

    return (
      <div
        className="col-xs-12 collapse phone-numbers-panel"
        id={this.props.id}
      >
        <span className="panel-title">Add a Mobile Number</span>
        <button
          type="button"
          className={`close pull-right${(this.state.forVerification ? ' hidden' : '')}`}
          aria-label="Close"
          data-toggle="collapse"
          data-target={`#${this.props.id}`}
          aria-expanded="false"
          aria-controls={this.props.id}
          onClick={() => this.props.onCancel(true)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <hr />
        <div className={`form-group${(this.state.forVerification ? ' hidden' : '')}`}>
          <label htmlFor="phone-country">Country</label>
          <select
            className="form-control"
            id="phone-country"
            onChange={this.countryChange}
            value={this.state.selectedCountryCode}
            disabled={this.state.forVerification}
          >
            {this.state.countries.map((country) =>
              (<option
                value={country.ISO2Code}
                key={country.ISO2Code}
              >
                {country.name}
              </option>)
            )}
          </select>
        </div>
        <div className={numberClass}>
          <label htmlFor="phone-number">Mobile Number</label>
          <div className="input-group">
            <span className="input-group-addon">
              +{this.state.selectedCountryCallingCode}
            </span>
            <input
              type="text"
              className="form-control"
              id="phone-number"
              value={this.state.number}
              onChange={this.numberChange}
              onBlur={this.numberBlur}
              onKeyDown={this.cancelSubmit}
              disabled={this.state.forVerification}
            />
          </div>
        </div>
        <div className={verificationCodeClass}>
          <label htmlFor="verification-code">Verification Code</label>
          <input
            type="text"
            className="form-control"
            id="verification-code"
            value={this.state.verificationCode}
            onChange={this.verificationCodeChange}
            onKeyDown={this.cancelSubmit}
          />
          <a
            href={Url.action(`user/numbers/mobile/${this.state.number}/send-code`)}
            onClick={this.resendVerification}
            className={`resend-code-link${(this.state.showResend ? '' : ' hidden')}`}
          >
            Resend Verification
          </a>
          <span className={`resend-code-span${(this.state.showResend ? ' hidden' : '')}`}>
            Verification code sent to this number
            +{this.state.selectedCountryCallingCode}{this.state.number}.
            Please wait upto 5 minutes to receive the verification code.
          </span>
        </div>
        <div className="form-group">
          <FormErrorLabel error={this.state.error} />
        </div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.addOrVerify}
        >
          {(this.state.forVerification ? 'Verify' : 'Add')}
        </button>
        <a
          href={Url.action('user/profile/numbers/why-verify')}
          className="why-verify-link pull-right"
        >
          Why verify?
        </a>
      </div>
    );
  }
}

AddPhoneNumberPanel.propTypes = {
  id: React.PropTypes.string.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};
