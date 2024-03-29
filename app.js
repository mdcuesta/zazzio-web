import Express from 'express';
import Path from 'path';
import FavIcon from 'serve-favicon';
import Logger from 'morgan';
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import ExpressReactViews from 'express-react-views';
import SassMiddleWare from 'node-sass-middleware';
import Session from 'express-session';
import Compression from 'compression';
import Helmet from 'helmet';
import Cors from 'cors';
import Raven from 'raven';
import AWS from 'aws-sdk';
import Version from './utilities/version';
import RouteConfig from './route-config';
import PathConfig from './path-config';
import AuthenticationConfig from './authentication-config';
import CSurfConfig from './csurf-config';
import CommonSessionMiddleware from './middlewares/common-session-middleware';
import ForceSslMiddleWare from './middlewares/force-ssl-middleware';

const express = Express;
const app = express();
const path = Path;
const favicon = FavIcon;
const logger = Logger;
const cookieParser = CookieParser;
const bodyParser = BodyParser;
const expressReactViews = ExpressReactViews;
const sassMiddleWare = SassMiddleWare;
const session = Session;
const compression = Compression;
const helmet = Helmet;
const cors = Cors;
const raven = Raven;
const version = Version;
const routeConfig = RouteConfig;
const pathConfig = PathConfig;
const authConfig = AuthenticationConfig;
const csurfConfig = CSurfConfig;
const commonSessionMiddleware = CommonSessionMiddleware;
const forceSslMiddleWare = ForceSslMiddleWare;
const environment = app.get('env');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
const engineOptions = {
  beautify: false,
  babel: {
    presets: ['react', 'es2015'],
  },
  transformViews: 'babel',
};
app.engine('jsx', expressReactViews.createEngine(engineOptions));

// force ssl on production
if (environment === 'production') {
  app.use(forceSslMiddleWare);
}

app.use(cors({
  origin: [process.env.CDN_DISTRIBUTION_URL || '/', process.env.APP_DOMAIN || '/'],
  optionsSuccessStatus: 200,
}));

app.use(favicon(path.join(__dirname, `assets/${version}/images`, 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// csrf security
csurfConfig(app);
// localization
app.use(commonSessionMiddleware());

app.use(sassMiddleWare({
  src: path.join(__dirname, 'styles'),
  dest: path.join(__dirname, `assets/${version}/stylesheets`),
  debug: environment === 'development',
  outputStyle: environment === 'development' ? 'extended' : 'compressed',
  prefix: `/${version}/stylesheets`,
}));

app.use(compression());
app.use(helmet());
app.set('trust proxy', 1); // trust only first proxy
app.use(session({
  secret: process.env.SESSION_SECRET || 'anonymous penguin',
  resave: false,
  saveUninitialized: true,
  name: 'zazz-io-id',
  cookie: {
    secure: environment === 'production',
  },
}));


if (environment === 'production') {
  app.use(raven.middleware.express
    .requestHandler(process.env.SENTRY_CLIENT_KEY ||
      'https://b821575399244c389156af415401c5f5:0982d53a3a6949468a261fc8c2602f32@sentry.io/97962'));
}
authConfig(app);
pathConfig(app);
routeConfig(app);

// set AWS config for development
if (environment === 'development') {
  AWS.config.update({
    accessKeyId: 'AKIAJTHZ5U26G42NDM6A',
    secretAccessKey: '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',
  });
}

// catch robots.txt
if ((process.env.STAGING || 'true') === 'true') {
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (environment === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production sentry logger
if (environment === 'production') {
  app.use(raven.middleware.express
    .errorHandler(process.env.SENTRY_CLIENT_KEY ||
      'https://b821575399244c389156af415401c5f5:0982d53a3a6949468a261fc8c2602f32@sentry.io/97962'));
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
