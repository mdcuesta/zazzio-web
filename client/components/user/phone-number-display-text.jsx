import React from 'react';
import Url from '../../helpers/url-helper';

export default function PhoneNumberDisplayText(props) {
  const verifiedPane = props.isVerified
    ? (<VerifiedPane />)
    : (<UnVerifiedPane />);

  return (
    <div className="input-group input-group-mobile">
      <span className="input-group-addon hidden-md-down">
        {props.countryCode}
      </span>
      <input
        type="text"
        className="form-control"
        value={props.number}
        disabled
      />
      {verifiedPane}
      <div className="input-group-addon input-group-delete">
        <a href={Url.action('user/profile/mobile-number/number/delete')}>
          <i className="fa fa-remove" />
        </a>
      </div>
    </div>
  );
}

PhoneNumberDisplayText.propTypes = {
  countryCode: React.PropTypes.string.isRequired,
  number: React.PropTypes.string.isRequired,
  isVerified: React.PropTypes.bool.isRequired,
};

function VerifiedPane() {
  return (
    <div className="input-group-addon verified text-left">
      <i className="fa fa-check-square-o" />
      &nbsp;Verified
    </div>
  );
}

function UnVerifiedPane() {
  return (
    <a
      className="input-group-addon unverified text-left"
      href={Url.action('user/profile/mobile-number/number/verify')}
    >
      <i className="fa fa-minus-square-o" />
      &nbsp;Verify
    </a>
  );
}
