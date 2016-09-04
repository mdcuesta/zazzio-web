import React, { Component } from 'react';
import '../../core';
import '../../../node_modules/foundation-sites/dist/plugins/foundation.reveal';
import LoginModalTabs from './login-modal-tabs';

/**
 * LoginModal
 */
export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSize: 'tiny',
    };
    this.closeModal = this.closeModal.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    $(window).on('changed.zf.mediaquery', (event, newSize) => {
      let modalSize = 'tiny';
      if (newSize === 'small' || newSize === 'medium') {
        modalSize = 'small';
      }
      this.setState({
        modalSize,
      });
    });
  }

  closeModal() {
    $(`#${this.props.id}`).foundation('close');
  }

  /* global Foundation:false */
  render() {
    return (
      <div
        className={`${this.state.modalSize} reveal`}
        id={this.props.id}
        data-animation-in="fade-in"
        data-animation-out="fade-out"
        data-close-on-click="false"
        data-reveal
      >
        <LoginModalTabs modalType={this.props.modalType} />
        <button
          className="close-button"
          aria-label="Close Login Modal"
          type="button"
          onClick={this.closeModal}
        >
          <span aria-hidden>&times;</span>
        </button>
      </div>
    );
  }
}

LoginModal.propTypes = {
  id: React.PropTypes.string.isRequired,
  modalType: React.PropTypes.string.isRequired,
};
