import React from 'react';
import LoginModalTabs from './login-modal-tabs';

/**
 * LoginModal
 */
export default function LoginModal(props) {
  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="login-signup-modal-label"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-sm"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <LoginModalTabs />
          </div>
        </div>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  id: React.PropTypes.string.isRequired,
};
