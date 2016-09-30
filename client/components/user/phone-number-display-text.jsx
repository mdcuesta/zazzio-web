import React, { Component } from 'react';
import Url from '../../helpers/url-helper';
import VerifyPanel from './verify-phone-number-panel';
import NumbersAction from '../../actions/phone-numbers-actions';

export default class PhoneNumberDisplayText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
    this.toggleShowHide = this.toggleShowHide.bind(this);
    this.delete = this.delete.bind(this);
  }

  toggleShowHide() {
    this.setState({
      show: !this.state.show,
    });
  }

  delete(e) {
    e.preventDefault();
    NumbersAction.deleteMobileNumber(this.props.number);
  }

  render() {
    const verifiedPane = this.props.isVerified
      ? (<VerifiedPane />)
      : (
      <UnVerifiedPane
        verifyPanelId={`pverify-${this.props.index}`}
        toggleShowHide={this.toggleShowHide}
      />);

    const verifyPanel = this.props.isVerified
      ? ''
      : (
      <VerifyPanel
        id={`pverify-${this.props.index}`}
        number={this.props.number}
        toggleShowHideParent={this.toggleShowHide}
      />
      );

    return (
      <div>
        <div className={`input-group input-group-mobile${(this.state.show ? '' : ' hidden')}`}>
          <input
            type="text"
            className="form-control txt-number"
            value={`+${this.props.number}`}
            disabled
          />
          {verifiedPane}
          <div className="input-group-addon input-group-delete">
            <a
              href={Url.action(`user/numbers/mobile/${this.props.number}/delete`)}
              data-target="#"
              onClick={this.delete}
            >
              <i className="fa fa-remove" />
            </a>
          </div>
        </div>
       {verifyPanel}
      </div>
    );
  }
}

PhoneNumberDisplayText.propTypes = {
  number: React.PropTypes.string.isRequired,
  isVerified: React.PropTypes.bool.isRequired,
  index: React.PropTypes.number.isRequired,
};

function VerifiedPane() {
  return (
    <div className="input-group-addon verified text-center">
      Verified&nbsp;
      <i className="fa fa-check-square-o" />
    </div>
  );
}

function UnVerifiedPane(props) {
  return (
    <a
      className="input-group-addon unverified text-center"
      href={`#${props.verifyPanelId}`}
      data-toggle="collapse"
      aria-expanded="false"
      aria-controls={props.verifyPanelId}
      onClick={props.toggleShowHide}
    >
      Verify
    </a>
  );
}

UnVerifiedPane.propTypes = {
  verifyPanelId: React.PropTypes.string.isRequired,
  toggleShowHide: React.PropTypes.func.isRequired,
};
