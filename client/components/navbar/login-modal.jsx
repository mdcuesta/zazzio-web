import React, { Component } from 'react';
import LoginModalTabs from './login-modal-tabs';
import Store from '../../stores/quick-register-store';

/**
 * LoginModal
 */
export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountCreated: false,
    };
    this.onChange = this.onChange.bind(this);
    this.close = this.close.bind(this);
    Store.addChangeListener(this.onChange);
  }

  onChange() {
    const account = Store.getCreatedAccount();
    if (account !== null) {
      this.setState({
        accountCreated: true,
      });
    }
  }

  close() {
    $(`#${this.props.id}`).modal('hide');
    if (this.state.accountCreated) {
      location.reload(true);
    }
  }

  render() {
    const tabIndex = this.state.accountCreated ? {
      tabIndex: -1,
    } : {};

    return (
      <div
        className="modal fade"
        id={this.props.id}
        {...tabIndex}
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
                aria-label="Close"
                onClick={this.close}
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
}

LoginModal.propTypes = {
  id: React.PropTypes.string.isRequired,
};
