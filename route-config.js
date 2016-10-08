import Root from './controllers/root';
import Authentication from './controllers/authentication';
import SignUp from './controllers/sign-up';
import UserDashboard from './controllers/user-dashboard';
import UserProfile from './controllers/user-profile';
import UserNumbers from './controllers/user-numbers';
import Lists from './controllers/lists';
import File from './controllers/file';

export default function configure(app) {
  // root
  app.use('/', Root);

  // authentication
  app.use('/auth', Authentication);

  // sign-up
  app.use('/sign-up', SignUp);

  // user pages
  app.use('/user/dashboard', UserDashboard);
  app.use('/user/profile', UserProfile);
  app.use('/user/numbers', UserNumbers);

  // files
  app.use('/file', File);

  // misc
  app.use('/lists', Lists);
}
