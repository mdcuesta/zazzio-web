import Raven from 'raven-js';

Raven.config(process.env.SENTRY_PUBLIC_CLIENT_KEY ||
  'https://b821575399244c389156af415401c5f5@sentry.io/97962').install();
