import Root from './controllers/root';
import Authentication from './controllers/authentication';
import SignUp from './controllers/sign-up';
import Account from './controllers/account';

export default function configure(app) {
  app.use('/', Root);
  app.use('/auth', Authentication);
  app.use('/sign-up', SignUp);
  app.use('/account', Account);
}
