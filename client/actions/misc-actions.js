import Dispatcher from '../dispatcher';
import * as MiscApi from '../apis/misc-api';
import MiscConstants from '../constants/misc-constants';

export class MiscActions {
  constructor() {
    this.countriesLoaded = false;
    this.countriesWithCallingCodeLoaded = false;
    this.loadCountries = this.loadCountries.bind(this);
    this.loadCountriesWithCallingCode = this.loadCountriesWithCallingCode.bind(this);
    this.loadCountriesComplete = this.loadCountriesComplete.bind(this);
    this.loadCountriesWithCallingCode = this.loadCountriesWithCallingCode.bind(this);
  }

  loadCountries() {
    if (!this.countriesLoaded) {
      MiscApi.loadCountries();
    }
  }

  loadCountriesWithCallingCode() {
    if (!this.countriesWithCallingCodeLoaded) {
      MiscApi.loadCountriesWithCallingCode();
    }
  }

  loadCountriesComplete(data) {
    this.countriesLoaded = true;
    Dispatcher.dispatchServerAction({
      actionType: MiscConstants.COUNTRIES_LOADED,
      data,
    });
  }

  loadCountriesWithCallingCodeComplete(data) {
    this.countriesWithCallingCodeLoaded = true;
    Dispatcher.dispatchServerAction({
      actionType: MiscConstants.COUNTRIES_WITH_CALLING_CODE_LOADED,
      data,
    });
  }
}

const miscActions = new MiscActions();
export default miscActions;
