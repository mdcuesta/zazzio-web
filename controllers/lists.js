import { Router } from 'express';
import { CsrfProtected } from '../utilities/security';
import * as CountryService from '../services/country-service';

export function countries(req, res) {
  res.status(200)
    .json(CountryService.getCountries());
}

export function countriesWithCallingCode(req, res) {
  res.status(200)
    .json(CountryService.getCountriesAndCallingCode());
}

const csrfProtected = CsrfProtected;
const expressRoute = Router;
const router = expressRoute();

router.get('/countries',
  csrfProtected(),
  countries);

router.get('/countries-calling-code',
  csrfProtected(),
  countriesWithCallingCode);

/**
 * Exports router as default
 */
export default router;
