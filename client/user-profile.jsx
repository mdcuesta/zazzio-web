import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import './utils';
import './common/navbar-transformations';
import './common/navbar-modal-transformations';
import PhoneNumbersPanel from './components/user/phone-numbers-panel';

const tempContainer = document.createElement('div');

ReactDOM.render(<PhoneNumbersPanel />, tempContainer);
const phoneNumbersPanel = document.getElementById('phone-numbers-panel');
$(phoneNumbersPanel).replaceWith(tempContainer.querySelector('#phone-numbers-panel'));
