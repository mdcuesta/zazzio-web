import React, { Component } from 'react';
import MotionUI from 'motion-ui';
import Url from '../../helpers/url-helper';
import VerifyPanel from './verify-phone-number-panel';
import NumbersAction from '../../actions/phone-numbers-actions';

const RES_NUMBER = require(`../../localization/${process.env.LOCALE}/user-phone-numbers`);

export default class PhoneNumberDisplayText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      verified: false,
    };
    this.toggleShowHide = this.toggleShowHide.bind(this);
    this.delete = this.delete.bind(this);
  }

  toggleShowHide(index, verified = false) {
    const setShowState = (callback) => {
      this.setState({
        show: !this.state.show,
        verified,
      });
      if (callback) {
        callback();
      }
    };
    if (!this.state.show) {
      MotionUI.animateOut(`#pverify-${index}`, 'fade-out', setShowState);
    } else {
      setShowState(() => {
        MotionUI.animateIn(`#pverify-${index}`, 'fade-in');
      });
    }
  }

  delete(e) {
    e.preventDefault();
    NumbersAction.deleteMobileNumber(this.props.number);
  }

  render() {
    const verifiedPane = this.props.isVerified || this.state.verified
      ? (<VerifiedPane />)
      : (
        <UnVerifiedPane
          verifyPanelId={`pverify-${this.props.index}`}
          toggleShowHide={this.toggleShowHide}
          index={this.props.index}
        />);

    const verifyPanel = this.props.isVerified
      ? ''
      : (
        <VerifyPanel
          id={`pverify-${this.props.index}`}
          index={this.props.index}
          number={this.props.number}
          toggleShowHideParent={this.toggleShowHide}
        />
      );

    const hiddenClass = this.state.show ? '' : ' hidden';

    return (
      <div>
        <div className={`col-sm-12 group-mobile group-mobile-${this.props.index}${hiddenClass}`}>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8 number">
            <span>{`+${this.props.number}`}</span>
          </div>
          {verifiedPane}
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-1 number-delete">
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
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3 verified">
      <span className="hidden-xs-down">
        {RES_NUMBER.verified}&nbsp;
      </span>
      <i className="fa fa-check-square-o" />
    </div>
  );
}

function UnVerifiedPane(props) {
  return (
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3 unverified ">
      <a
        role="button"
        aria-expanded="false"
        aria-controls={props.verifyPanelId}
        onClick={() => props.toggleShowHide(props.index)}
      >
        {RES_NUMBER.verify}
      </a>
    </div>
  );
}

UnVerifiedPane.propTypes = {
  verifyPanelId: React.PropTypes.string.isRequired,
  toggleShowHide: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
};
