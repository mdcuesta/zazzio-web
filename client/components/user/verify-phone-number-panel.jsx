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
    };
    this.onChange = this.onChange.bind(this);
    NumbersStore.addChangeListener(this.onChange);
    this.verificationCodeChange = this.verificationCodeChange.bind(this);
  }

  componentWillUnmount() {
    NumbersStore.removeChangeListener(this.onChange);
  }

  onChange() {
    const status = NumbersStore
      .getVerifyMobileNumberStatus(this.props.number);

    const error = this.getError(status);

    if (status === 0) {
      this.props.toggleShowHideParent();
      NumbersAction.getMobileNumbers();
    } else {
      this.setState({
        error,
      });
      $(`#${this.props.id}-${this.props.number}`).focus();
    }
  }

  getError(status) {
    return getStatus(status);
  }

  verificationCodeChange(e) {
    this.setState({
      verificationCode: e.target.value,
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
    NumbersAction.verifyMobileNumber(this.props.number,
      this.state.verificationCode);
  }

  render() {
    return (
      <div
        className="col-xs-12 collapse phone-numbers-panel fadeIn animated verify"
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
          onClick={this.props.toggleShowHideParent}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="form-group">
          <label htmlFor="verification-code">Verification Code</label>
          <input
            type="text"
            className="form-control"
            id={`${this.props.id}-${this.props.number}`}
            value={this.state.verificationCode}
            onChange={this.verificationCodeChange}
            onKeyDown={this.cancelSubmit}
          />
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
