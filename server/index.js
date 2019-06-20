/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('config');
const logger = require('./logger');
const auth = require('./auth');

// const ENV = config.get('env');

// App Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure Sessions
const sessionOptions = {
  name: 'dx',
  // NOTE: Session secret should be set via environment variable
  //       during deploy. Do not use the default value in production.
  secret: process.env.SESSION_SECRET || 'dx',
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: false
  }
};

if (config.get('env') === 'production') {
  sessionOptions.store = new RedisStore({
    host: config.get('redis.host'),
    port: config.get('redis.port'),
    logErrors: true
  });
}

app.use(session(sessionOptions));

// Configure Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(auth.passportStrategy);
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

app.get('/login', auth.login);
app.get('/logout', auth.logout);

// Health Check (path configured in cloudformation template)
app.get('/healthcheck', (req, res) => {
  console.log('Health Check Request');
  res.status(200).end();
});

app.post('/login/saml', passport.authenticate('saml'), (req, res) => {
  res.redirect('/');
});

app.get('/logout/saml', (req, res) => {
  req.logout();
  res.redirect('/');
});
// Import API Routes
require('./api')(app);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
}

module.exports = app;
