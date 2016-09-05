import Root from './controllers/root';
import Authentication from './controllers/authentication';
import Account from './controllers/account';

export default function configure(app) {
  app.use('/', Root);
  app.use('/auth', Authentication);
  app.use('/account', Account);
}
