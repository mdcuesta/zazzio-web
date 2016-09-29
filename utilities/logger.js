import Raven from 'raven';

const client = new Raven.Client(process.env.SENTRY_CLIENT_KEY ||
  'https://b821575399244c389156af415401c5f5:0982d53a3a6949468a261fc8c2602f32@sentry.io/97962');

export default (error, user = null) => {
  if (user !== null) {
    client.setUserContext(user);
  }
  client.captureException(error);
};
