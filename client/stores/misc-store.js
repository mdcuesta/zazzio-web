import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import CoreConstants from '../constants/core-constants';
import MiscConstants from '../constants/misc-constants';

const CHANGE_EVENT = CoreConstants.CHANGE_EVENT;

export class MiscStore extends EventEmitter {
  constructor() {
    super();
    this.countries = [];
    this.countriesWithCallingCode = [];
    this.getCountries = this.getCountries.bind(this);
    this.getCountriesWithCallingCode = this.getCountriesWithCallingCode.bind(this);
    this.setCountries = this.setCountries.bind(this);
    this.setCountriesWithCallingCode = this.setCountriesWithCallingCode.bind(this);
  }

  getCountries() {
    return this.countries;
  }

  getCountriesWithCallingCode() {
    return this.countriesWithCallingCode;
  }

  setCountries(countries) {
    this.countries = countries;
  }

  setCountriesWithCallingCode(countries) {
    this.countriesWithCallingCode = countries;
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}

const miscStore = new MiscStore();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {
    case MiscConstants.COUNTRIES_LOADED:
      miscStore.setCountries(action.data);
      break;
    case MiscConstants.COUNTRIES_WITH_CALLING_CODE_LOADED:
      miscStore.setCountriesWithCallingCode(action.data);
      break;
    default:
      return true;
  }
  miscStore.emit(CHANGE_EVENT);
  return true;
});

export default miscStore;
