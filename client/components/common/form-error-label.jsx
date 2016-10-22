import React from 'react';


export default function FormErrorLabel(props) {
  let error = '';
  if (props.resource !== null && typeof props.resource[props.error] !== 'undefined') {
    error = props.resource[props.error];
  } else {
    error = props.error !== '' ? props.error : '';
  }
  return (
    <div className="error-span-container">
      <span className="error-span form-control-feedback">
        {error}
      </span>
    </div>
  );
}

FormErrorLabel.propTypes = {
  error: React.PropTypes.string.isRequired,
  resource: React.PropTypes.object,
};

FormErrorLabel.defaultProps = {
  resource: null,
};
