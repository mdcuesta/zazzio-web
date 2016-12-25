import Root from './controllers/root';
import Authentication from './controllers/authentication';
import SignUp from './controllers/sign-up';
import UserDashboard from './controllers/user-dashboard';
import UserProfile from './controllers/user-profile';
import UserNumbers from './controllers/user-numbers';
import UserListings from './controllers/user-listings';
import UserMessages from './controllers/user-messages';
import UserAccount from './controllers/user-account';
import Lists from './controllers/lists';
import File from './controllers/file';
import Listings from './controllers/listings';

export default function configure(app) {
  // authentication
  app.use('/auth', Authentication);

  // sign-up
  app.use('/sign-up', SignUp);

  // user pages
  app.use('/user/dashboard', UserDashboard);
  app.use('/user/profile', UserProfile);
  app.use('/user/numbers', UserNumbers);
  app.use('/user/listings', UserListings);
  app.use('/user/messages', UserMessages);
  app.use('/user/account', UserAccount);

  // listings
  app.use('/listings', Listings);

  // files
  app.use('/file', File);

  // misc
  app.use('/lists', Lists);

  // root
  app.use('/', Root);
}
