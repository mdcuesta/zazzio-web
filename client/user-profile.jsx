import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import './utils';
import './common/navbar-transformations';
import './common/navbar-modal-transformations';
import PhoneNumbersPanel from './components/user/phone-numbers-panel';
import UserPhotoPanel from './components/user/user-photo-panel';

const tempContainer = document.createElement('div');

ReactDOM.render(<PhoneNumbersPanel />, tempContainer);
const phoneNumbersPanel = document.getElementById('phone-numbers-panel');
$(phoneNumbersPanel).replaceWith(tempContainer.querySelector('#phone-numbers-panel'));


const photoPanel = $(document.getElementById('user-photo-panel'));
const imgId = photoPanel.data('img-id');
const imgAlt = photoPanel.data('img-alt');
ReactDOM.render(
  <UserPhotoPanel
    altText={imgAlt}
    profilePhoto={imgId}
  />, tempContainer);
photoPanel.replaceWith(tempContainer.querySelector('#user-photo-panel'));
