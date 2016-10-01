import React from 'react';
import ReactDOM from 'react-dom';
import DropdownLink from '../components/navbar/dropdown-link';

const tempContainer = document.createElement('div');
const authenticated = $('#authenticated').val() === 'true';

// replace browse link with dropdown
ReactDOM.render(
  <DropdownLink
    id="link-browse"
    text="Browse"
    link="browse"
  />, tempContainer);
const browseLink = document.getElementById('link-browse');
$(browseLink).replaceWith(tempContainer.querySelector('#link-browse'));

// replace explore link with dropdown
ReactDOM.render(
  <DropdownLink
    id="link-explore"
    text="Areas"
    link="explore"
  />, tempContainer);
const exploreLink = document.getElementById('link-explore');
$(exploreLink).replaceWith(tempContainer.querySelector('#link-explore'));


// remove logout button
if (authenticated) {
  $('#nav-item-sign-out').remove();
}
