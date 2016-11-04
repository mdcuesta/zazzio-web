import React, { Component } from 'react';

export default class WizardContainer extends Component {
  constructor(props) {
    super(props);
    this.scrollTo = this.scrollTo.bind(this);
    this.bindScroll = this.bindScroll.bind(this);
  }

  componentDidMount() {
    this.scroller = $(`#${this.props.id} .wizard-scroller`);
    this.bindScroll();
  }

  bindScroll() {
    this.scroller.on('scroll', () => {
      clearTimeout($.data(this, 'scrollCheck'));
      $.data(this, 'scrollCheck', setTimeout(() => {
        const children = $(`#${this.props.id} .wizard-scroller .wizard-content`).children();
        const verticalMidline = $(window).height() / 2;

        for (let i = 0; i < children.length; i++) {
          const $child = $(children[i]);
          const childTop = $child.offset().top;
          const childBottom = childTop + $child.height();
          if (verticalMidline >= childTop && verticalMidline <= childBottom) {
            this.scrollTo($child.position().top);
            return;
          }
        }
      }, 250));
    });
  }

  scrollTo(position) {
    this.scroller.unbind('scroll');
    this.scroller.stop().animate({
      scrollTop: position,
    }, 250, () => {
      this.bindScroll();
    });
  }

  render() {
    return (
      <div className="wizard-scroller">
        <div className="wizard-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

WizardContainer.propTypes = {
  children: React.PropTypes.array,
  id: React.PropTypes.string.isRequired,
};
