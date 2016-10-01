import React, { Component } from 'react';
import FormErrorLabel from '../common/form-error-label';
import Url from '../../helpers/url-helper';
import NumbersStore from '../../stores/phone-numbers-store';
import NumbersAction from '../../actions/phone-numbers-actions';
import Status from './status';

const getStatus = Status;

export default class VerifyPhoneNumberPanel extends Component {
  constructor(props) {
    super(props);
    this.verify = this.verify.bind(this);
    this.state = {
      error: '',
      verificationCode: '',
      event: 'resend',
      showResend: true,
      resendHasError: false,
    };
    this.onChange = this.onChange.bind(this);
    NumbersStore.addChangeListener(this.onChange);
    this.verificationCodeChange = this.verificationCodeChange.bind(this);
    this.resendVerification = this.resendVerification.bind(this);
  }

  componentWillUnmount() {
    NumbersStore.removeChangeListener(this.onChange);
  }

  onChange() {
    if (this.state.event === 'verify') {
      const status = NumbersStore
        .getVerifyMobileNumberStatus(this.props.number);

      const error = this.getError(status);

      if (status === 0) {
        $(`#${this.props.id}`).collapse('toggle');
        this.props.toggleShowHideParent(true);
      } else {
        this.setState({
          error,
        });
        $(`#${this.props.id}-${this.props.number}`).focus();
      }
    } else if (this.state.event === 'resend') {
      const status = NumbersStore
        .getResendVerificationStatus(this.props.number);

      const error = this.getError(status);

      if (status !== 0) {
        this.setState({
          error,
          resendHasError: true,
        });
      } else {
        this.setState({
          resendHasError: false,
        });
      }
    }
  }

  getError(status) {
    return getStatus(status);
  }

  verificationCodeChange(e) {
    this.setState({
      verificationCode: e.target.value,
      error: '',
    });
  }

  verify() {
    if (this.state.verificationCode.trim() === '') {
      this.setState({
        error: 'Verification code is required.',
        verificationCodeHasError: true,
      });
      $(`#${this.props.id}-${this.props.number}`).focus();
      return;
    }
    this.setState({
      event: 'verify',
    });
    NumbersAction.verifyMobileNumber(this.props.number,
      this.state.verificationCode);
  }

  resendVerification(e) {
    NumbersAction.resendMobileNumberVerification(this.props.number);
    this.setState({
      event: 'resend',
      showResend: false,
    });

    setTimeout(() => {
      this.setState({
        showResend: true,
      });
    }, 300000);

    e.preventDefault();
  }

  render() {
    const resendCodeSpanClass =
    `resend-code-span${(this.state.showResend || this.state.resendHasError ? ' hidden' : '')}`;
    return (
      <div
        className={`col-xs-12 collapse phone-numbers-panel fadeIn animated verify ${this.props.id}`}
        id={this.props.id}
      >
        <span className="panel-title">{`+${this.props.number}`}</span>
        <button
          type="button"
          className="close pull-right"
          aria-label="Close"
          data-toggle="collapse"
          data-target={`#${this.props.id}`}
          aria-expanded="false"
          aria-controls={this.props.id}
          onClick={() => this.props.toggleShowHideParent(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <hr />
        <div
          className={`form-group verification${(this.state.error !== '' ? ' has-danger' : '')}`}
        >
          <label htmlFor="verification-code">Verification Code</label>
          <input
            type="text"
            className="form-control"
            id={`${this.props.id}-${this.props.number}`}
            value={this.state.verificationCode}
            onChange={this.verificationCodeChange}
            onKeyDown={this.cancelSubmit}
          />
          <a
            href={Url.action(`user/numbers/mobile/${this.props.number}/send-code`)}
            onClick={this.resendVerification}
            className={`resend-code-link${(this.state.showResend ? '' : ' hidden')}`}
          >
            Resend Verification
          </a>
          <span
            className={resendCodeSpanClass}
          >
            Verification code sent to this number +{this.props.number}.
            Please wait upto 5 minutes to receive the verification code.
          </span>
        </div>
        <div className="form-group">
          <FormErrorLabel error={this.state.error} />
        </div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.verify}
        >
          Verify
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

VerifyPhoneNumberPanel.propTypes = {
  id: React.PropTypes.string.isRequired,
  number: React.PropTypes.string.isRequired,
  toggleShowHideParent: React.PropTypes.func.isRequired,
};
