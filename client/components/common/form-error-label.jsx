import React from 'react';


export default function FormErrorLabel(props) {
  return (
    <span
      className={`form-error${(props.error !== '' ? ' is-visible' : '')}`}
    >
      {props.error}
    </span>
  );
}

FormErrorLabel.propTypes = {
  error: React.PropTypes.string,
};
