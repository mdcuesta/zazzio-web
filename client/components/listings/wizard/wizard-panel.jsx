import React, { Component } from 'react';

const PANEL_HEIGHT_MULTIPLIER = 0.8;

export default class WizardPanel extends Component {
  constructor(props) {
    super(props);
    this.initializePanel = this.initializePanel.bind(this);
    this.resize = this.resize.bind(this);
    this.initializePanel();
  }

  initializePanel() {
    const windowHeight = $(window).height();
    const windowWidth = $(window).width();
    let multiplier = PANEL_HEIGHT_MULTIPLIER;
    if (windowWidth <= 544) {
      multiplier = 1;
    }
    const height = windowHeight * multiplier;
    this.state = {
      height: `${height}px`,
    };
    $(window).on('resize', this.resize);
  }

  resize() {
    const windowHeight = $(window).height();
    const windowWidth = $(window).width();
    let multiplier = PANEL_HEIGHT_MULTIPLIER;
    if (windowWidth <= 544) {
      multiplier = 1;
    }
    const height = windowHeight * multiplier;
    this.setState({
      height: `${height}px`,
    });
  }

  render() {
    return (
      <div style={{ height: this.state.height }} className="animated fadeIn" />
    );
  }
}
