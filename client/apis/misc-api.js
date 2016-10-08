import Actions from '../actions/misc-actions';
import Url from '../helpers/url-helper';
import * as Utils from './utils';

export function loadCountries() {
  Utils.get(Url.action('lists/countries'))
  .done((response) => Actions.loadCountriesComplete(response))
  .fail(Utils.fail);
}

export function loadCountriesWithCallingCode() {
  Utils.get(Url.action('lists/countries-calling-code'))
  .done((response) => {
    Actions.loadCountriesWithCallingCodeComplete(response);
  })
  .fail(Utils.fail);
}
