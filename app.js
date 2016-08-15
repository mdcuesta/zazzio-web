'use strict';

import Express from 'express';
import Path from 'path';
import FavIcon from 'serve-favicon';
import Logger from 'morgan';
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import ExpressReactViews from 'express-react-views';
import SassMiddleWare from 'node-sass-middleware';

import * as RouteConfig from './route-config';
import * as PathConfig from './path-config';
import * as AuthenticationConfig from './authentication-config';
import * as DataConfig from './data-config';

const app = Express();
const path = Path;
const favicon = FavIcon;
const logger = Logger;
const cookieParser = CookieParser;
const bodyParser = BodyParser;
const expressReactViews = ExpressReactViews;
const sassMiddleWare = SassMiddleWare;
const routeConfig = RouteConfig;
const pathConfig = PathConfig;
const authConfig = AuthenticationConfig;
const dataConfig = DataConfig;

const environment = app.get('env');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
const engineOptions = { 
  beautify: false,
  babel: {
    presets: ['react', 'es2015']
  },
  transformViews: 'babel'
 };
app.engine('jsx', expressReactViews.createEngine(engineOptions));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleWare({
  src: path.join(__dirname, 'styles'),
  dest: path.join(__dirname, 'assets/stylesheets'),
  debug: environment === 'development',
  outputStyle: environment === 'development' ? 'extended' : 'compressed',
  prefix: '/stylesheets' 
}));

authConfig.configure(app);
pathConfig.configure(app);
routeConfig.configure(app);
dataConfig.configure();

// catch robots.txt
if(environment !== 'production') {
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (environment === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
