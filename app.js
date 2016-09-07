import Express from 'express';
import Path from 'path';
import FavIcon from 'serve-favicon';
import Logger from 'morgan';
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import ExpressReactViews from 'express-react-views';
import SassMiddleWare from 'node-sass-middleware';
import Session from 'express-session';
import Raygun from 'raygun';

import RouteConfig from './route-config';
import PathConfig from './path-config';
import AuthenticationConfig from './authentication-config';


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
const routeConfig = RouteConfig;
const pathConfig = PathConfig;
const authConfig = AuthenticationConfig;
const raygun = new Raygun.Client().init({
  apiKey: process.env.RAYGUN_APIKEY || 'ZN1WEhQMOEsRFzA99mLPLg==',
});
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

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'assets/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleWare({
  src: path.join(__dirname, 'styles'),
  dest: path.join(__dirname, 'assets/stylesheets'),
  debug: environment === 'development',
  outputStyle: environment === 'development' ? 'extended' : 'compressed',
  prefix: '/stylesheets',
}));

app.set('trust proxy', 1); // trust only first proxy
app.use(session({
  secret: process.env.SESSION_SECRET || 'anonymous penguin',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: environment === 'production',
  },
}));

authConfig(app);
pathConfig(app);
routeConfig(app);

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

// production raygun logger
app.use(raygun.expressHandler);

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
