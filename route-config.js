import Root from './controllers/root';
import Authentication from './controllers/authentication';
import SignUp from './controllers/sign-up';
import UserDashboard from './controllers/user-dashboard';
import UserProfile from './controllers/user-profile';

export default function configure(app) {
  app.use('/', Root);
  app.use('/auth', Authentication);
  app.use('/sign-up', SignUp);

  // user pages
  app.use('/user/dashboard', UserDashboard);
  app.use('/user/profile', UserProfile);
}
