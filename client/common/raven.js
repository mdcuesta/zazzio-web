import Raven from 'raven-js';

if (process.env.NODE_ENV === 'production') {
  Raven.config($('meta[name="raven-client-key"]').attr('content')).install();
}
