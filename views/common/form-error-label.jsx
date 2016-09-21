import React from 'react';

export default function FormErrorLabel(props) {
  return (
    <div className="error-span-container">
      <span className="error-span form-control-feedback">
        {props.error !== '' ? props.error : ''}
      </span>
    </div>
  );
}

FormErrorLabel.propTypes = {
  error: React.PropTypes.string,
};
