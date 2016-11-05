import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import './utils';
import NewListingWizard from './components/listings/wizard/new-listing';

const container = document.getElementById('new-listing-wizard');
ReactDOM.render(<NewListingWizard />, container);
