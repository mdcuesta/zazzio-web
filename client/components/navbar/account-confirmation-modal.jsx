import React, { Component } from 'react';

export default class AccountConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    $(`#${this.props.id}`).foundation('close');
  }

  render() {
    return (
      <div
        className="tiny reveal"
        id={this.props.id}
        data-animation-in="fade-in"
        data-animation-out="fade-out"
        data-close-on-click="false"
        data-reveal
      >
        <div className="small-12 medium-12 large-12">
          <h5>Congratulations!</h5>
          <hr />
          <p>
            Congratulations <b>{this.props.name}</b>, your account has been succesffully created.
          </p>
          <p>
            We have sent an account confirmation link to your email <b>{this.props.email}</b>.
            Thank you.
          </p>
          <button
            className="expanded button"
            onClick={this.closeModal}
          >
            Got it
          </button>
        </div>
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

AccountConfirmationModal.propTypes = {
  id: React.PropTypes.string.isRequired,
  email: React.PropTypes.string,
  name: React.PropTypes.string,
};
