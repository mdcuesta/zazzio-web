import ErrorActions from '../actions/error-actions';
import MiscActions from '../actions/misc-actions';
import Url from '../helpers/url-helper';

export function loadCountries() {
  $.ajax({
    url: Url.action('lists/countries'),
    type: 'get',
  }).done((response) => {
    MiscActions.loadCountriesComplete(response);
  })
  .fail(ErrorActions.error);
}

export function loadCountriesWithCallingCode() {
  $.ajax({
    url: Url.action('lists/countries-calling-code'),
    type: 'get',
  }).done((response) => {
    MiscActions.loadCountriesWithCallingCodeComplete(response);
  })
  .fail(ErrorActions.error);
}
