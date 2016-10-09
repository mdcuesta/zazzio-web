import { Router } from 'express';
import { AjaxSecure } from '../utilities/security';
import * as CountryService from '../services/country-service';
import * as LanguageService from '../services/language-service';

export function countries(req, res) {
  res.status(200)
    .json(CountryService.getCountries());
}

export function countriesWithCallingCode(req, res) {
  res.status(200)
    .json(CountryService.getCountriesAndCallingCode());
}

export function languages(req, res) {
  res.status(200)
    .json(LanguageService.getLanguages());
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

router.get('/languages',
  ajaxSecure(),
  languages);

/**
 * Exports router as default
 */
export default router;
