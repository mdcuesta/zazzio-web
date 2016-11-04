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
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    const account = Store.getCreatedAccount();
    if (account !== null) {
      this.setState({
        accountCreated: true,
      });
    }
  }

  render() {
    const modalContent = (
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
              data-dismiss="modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <LoginModalTabs />
          </div>
        </div>
      </div>
    );

    if (this.state.accountCreated) {
      return (
        <div
          className="modal fade"
          id={this.props.id}
          role="dialog"
          aria-labelledby="login-signup-modal-label"
          aria-hidden="true"
        >
          {modalContent}
        </div>
      );
    }

    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="login-signup-modal-label"
        aria-hidden="true"
      >
        {modalContent}
      </div>
    );
  }
}

LoginModal.propTypes = {
  id: React.PropTypes.string.isRequired,
};
