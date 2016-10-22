import React from 'react';
import FormErrorLabel from './form-error-label';

export default function EmailErrorLabel(props) {
  if (props.existed) {
    let error = '';
    if (props.resource !== null && typeof props.resource[props.error] !== 'undefined') {
      error = props.resource[props.error];
    } else {
      error = props.error !== '' ? props.error : '';
    }
    return (
      <div className="error-span-container">
        <span
          className="error-span form-control-feedback"
        >
          {`${error} ${props.email}`}
          &nbsp;&nbsp;
          <a
            href="/login"
            className="link link-span"
            role="button"
          >
            {props.login}
          </a>
        </span>
      </div>
    );
  }

  return (
    <FormErrorLabel
      error={props.error}
      resource={props.resource}
    />
  );
}

EmailErrorLabel.propTypes = {
  error: React.PropTypes.string.isRequired,
  existed: React.PropTypes.bool,
  resource: React.PropTypes.object,
  email: React.PropTypes.string,
  login: React.PropTypes.string,
};

EmailErrorLabel.defaultProps = {
  resource: null,
  email: '',
  login: 'Log In',
};
