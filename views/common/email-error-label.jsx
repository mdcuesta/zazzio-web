import React from 'react';
import FormErrorLabel from './form-error-label';

export default function EmailErrorLabel(props) {
  if (props.existed) {
    return (
      <div className="error-span-container">
        <span
          className="error-span form-control-feedback hidden-xs-down"
        >
          An account is already associated with this email address.&nbsp;
          <a
            href="/login"
            className="link link-span"
            role="button"
          >
            Login?
          </a>
        </span>
        <span
          className="error-span form-control-feedback hidden-sm-up"
        >
          Email address in use.&nbsp;
          <a
            href="/login"
            className="link link-span"
            role="button"
          >
            Login?
          </a>
        </span>
      </div>
    );
  }

  return (
    <FormErrorLabel error={props.error} />
  );
}

EmailErrorLabel.propTypes = {
  error: React.PropTypes.string,
  existed: React.PropTypes.bool,
};
