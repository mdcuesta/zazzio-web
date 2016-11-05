import React, { Component } from 'react';
import MotionUI from 'motion-ui';

export default class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      closing: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const $toggler = $(`#${this.props.toggler}`);
    const menuWrapperSelector = `#${this.props.id} .menu`;

    $toggler.click(() => {
      const $mobileMenu = $(`#${this.props.id}`);
      const $mobileMenuBackdrop = $(`#${this.props.id} .backdrop`);
      const $mobileMenuWrapper = $(menuWrapperSelector);
      const $body = $('body');

      if (this.state.shown) {
        $mobileMenu.addClass('hidden');
        $mobileMenuBackdrop.removeClass('in');
        MotionUI.animateOut(menuWrapperSelector, 'slide-out-right', () => {
          $body.removeClass('overflow-y-hidden');
        });
      } else {
        $mobileMenu.removeClass('hidden');
        $mobileMenuBackdrop.addClass('in');
        $body.addClass('overflow-y-hidden');

        if ($mobileMenuWrapper.hasClass('hidden')) {
          $mobileMenuWrapper.removeClass('hidden');
        }

        MotionUI.animateIn(menuWrapperSelector, 'slide-in-right');
      }
      this.setState({
        shown: !this.state.shown,
      });
    });

    $(document).mouseup((e) => {
      if (this.state.shown) {
        const menu = $(menuWrapperSelector);
        if (!menu.is(e.target) && menu.has(e.target).length === 0) {
          this.close();
        }
      }
    });

    $(window).resize(() => {
      if (this.state.shown) {
        $(`#${this.props.id}`).addClass('hidden');
        $('body').removeClass('overflow-y-hidden');
        this.setState({
          shown: false,
        });
      }
    });
  }

  close() {
    if (this.state.closing) {
      return;
    }

    this.setState({
      closing: true,
    });

    const menuWrapperSelector = `#${this.props.id} .menu`;
    const $mobileMenu = $(`#${this.props.id}`);
    const $mobileMenuBackdrop = $(`#${this.props.id} .backdrop`);
    const $body = $('body');

    MotionUI.animateOut(menuWrapperSelector, 'slide-out-right', () => {
      $body.removeClass('overflow-y-hidden');
      $mobileMenu.addClass('hidden');
      $mobileMenuBackdrop.removeClass('in');

      this.setState({
        shown: false,
        closing: false,
      });
    });
  }

  render() {
    return (
      <div
        id={this.props.id}
        className="mobile-menu hidden-md-up hidden"
      >
        <div className="backdrop modal-backdrop fade" />
        <div className="menu ease hidden">
          <div className="content">
            <button
              type="button"
              className="close"
              aria-label="Close"
              data-dismiss="modal"
              onClick={this.close}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            &nbsp;
          </div>
        </div>
      </div>
    );
  }
}

MobileMenu.propTypes = {
  toggler: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
};
