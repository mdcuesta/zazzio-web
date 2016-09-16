import React, { Component } from 'react';
import LoginPanel from './login-panel';
import RegisterPanel from './register-panel';
import ModalStore from '../../stores/login-modal-store';
import ModalActions from '../../actions/login-modal-actions';

/**
 * LoginModalTabs
 */
export default class LoginModalTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: 'login',
    };
    this.onChange = this.onChange.bind(this);
    this.setModalType = this.setModalType.bind(this);
    ModalStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    ModalStore.removeChangeListener(this.onChange);
  }

  onChange() {
    const modalType = ModalStore.getModalType();
    this.setState({
      modalType,
    });
  }

  setModalType(modalType) {
    ModalActions.setModalType(modalType);
  }

  render() {
    return (
      <div>
        <div className="login-modal-tabs-content">
          <div
            style={(this.state.modalType === 'register' ? { display: 'none' } : {})}
            id="panel-signin"
          >
            <LoginPanel />
          </div>
          <div
            style={(this.state.modalType === 'login' ? { display: 'none' } : {})}
            id="panel-signup"
          >
            <RegisterPanel />
          </div>
        </div>
      </div>
    );
  }
}
