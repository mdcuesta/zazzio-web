import { Router } from 'express';
import { AjaxSecure } from '../utilities/security';
import * as CountryService from '../services/country-service';

export function countries(req, res) {
  res.status(200)
    .json(CountryService.getCountries());
}

export function countriesWithCallingCode(req, res) {
  res.status(200)
    .json(CountryService.getCountriesAndCallingCode());
}

const ajaxSecure = AjaxSecure;
const expressRoute = Router;
const router = expressRoute();

router.get('/countries',
  ajaxSecure(),
  countries);

router.get('/countries-calling-code',
  ajaxSecure(),
  countriesWithCallingCode);

/**
 * Exports router as default
 */
export default router;
