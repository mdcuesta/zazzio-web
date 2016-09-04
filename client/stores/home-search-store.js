import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import CoreConstants from '../constants/core-constants';
import HomeSearchConstants from '../constants/home-search-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

export class HomeSearchStore extends EventEmitter {
  constructor() {
    super();

    this.store = {
      searchTypes: [{
        label: 'Buy',
        searchType: 'Buy',
        heading: 'Your dream home awaits',
        propertyTypes: ['House and Lot',
          'Condominium',
          'Townhouse',
        ],
      }, {
        label: 'Rent',
        searchType: 'Rent',
        heading: 'Get to your next rental',
        propertyTypes: ['House and Lot',
          'Condominium',
          'Townhouse',
        ],
      }, {
        label: 'Sell',
        searchType: 'Sell',
        heading: 'Your next profit is a step away',
        propertyTypes: ['House and Lot',
          'Condominium',
          'Townhouse',
        ],
      }],
      selectedSearchType: 'Buy',
    };

    this.getSearchTypes.bind(this);
    this.getSelectedSearchType.bind(this);
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getSearchTypes() {
    return this.store.searchTypes;
  }

  getSelectedSearchType() {
    return Array.find(this.store.searchTypes,
      (type) => type.searchType === this.store.selectedSearchType);
  }

  setSelectedSearchType(searchType) {
    this.store.selectedSearchType = searchType;
  }
}

const homeSearchStore = new HomeSearchStore();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case HomeSearchConstants.SET_SEARCH_TYPE:
      homeSearchStore.setSelectedSearchType(action.selectedSearchType);
      homeSearchStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
  return true;
});

export default homeSearchStore;
