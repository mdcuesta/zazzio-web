import React from 'react';


export default function FormErrorLabel(props) {
  return (
    <span className="error-span form-control-feedback">
      {props.error !== '' ? props.error : ''}
    </span>
  );
}

FormErrorLabel.propTypes = {
  error: React.PropTypes.string,
};
