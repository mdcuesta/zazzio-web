'use strict';

import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import CoreConstants from '../constants/core-constants';
import HomeSearchConstants from  '../constants/home-search-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

let _store = {
  searchTypes: [{
    label: 'Buy',
    searchType: 'Buy',
    heading: 'Your dream home awaits',
    propertyTypes: ['House and Lot',
      'Condominium', 
      'Townhouse'
    ]
  }, {
    label: 'Rent',
    searchType: 'Rent',
    heading: 'Get to your next rental',
    propertyTypes: ['House and Lot',
      'Condominium', 
      'Townhouse'
    ]
  }, {
    label: 'Sell',
    searchType: 'Sell',
    heading: 'Your next profit is a step away',
    propertyTypes: ['House and Lot',
      'Condominium', 
      'Townhouse'
    ]
  }],
  selectedSearchType: 'Buy',
};


class HomeSearchStore extends EventEmitter {

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getSearchTypes() {
    return _store.searchTypes;
  }

  getSelectedSearchType() {
    return _store.searchTypes.find(s => s.searchType === _store.selectedSearchType);
  }
}

const homeSearchStore = new HomeSearchStore();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {

    case HomeSearchConstants.SET_SEARCH_TYPE:
      _store.selectedSearchType = action.selectedSearchType;
      homeSearchStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

export default homeSearchStore;
