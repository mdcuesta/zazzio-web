import React from 'react';
import Panel from './wizard-panel';
import WizardContainer from './wizard-container';

export default function NewListing() {
  return (
    <WizardContainer id="new-listing-wizard" className="wizard-wrapper">
      <Panel />
      <Panel />
      <Panel />
      <Panel />
      <Panel />
      <Panel />
      <Panel />
      <Panel />
    </WizardContainer>
  );
}
