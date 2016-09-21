import Root from './controllers/root';
import Authentication from './controllers/authentication';
import SignUp from './controllers/sign-up';
import User from './controllers/user';

export default function configure(app) {
  app.use('/', Root);
  app.use('/auth', Authentication);
  app.use('/sign-up', SignUp);
  app.use('/user', User);
}
