/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const logger = require('./logger');
const auth = require('./auth');

const ENV = process.env.NODE_ENV || 'development';

// App Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure Sessions
const sessionOptions = {
  name: 'dx',
  // NOTE: Session secret should be set via environment variable
  //       during deploy. Do not use the default value in production.
  secret: process.env.SESSION_SECRET || 'dx',
  saveUninitialized: false,
  resave: false,
  cookie: {}
};

if (ENV === 'production') {
  sessionOptions.cookie.secure = true;
  // TODO: Configure Redis session store
}

app.use(session(sessionOptions));

// Configure Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(auth.passportStrategy);
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

app.get('/login', passport.authenticate('saml'), (req, res) => {
  res.redirect('/');
});
app.get('/logout', auth.logout);

app.post('/login/saml', passport.authenticate('saml'), (req, res) => {
  res.redirect('/');
});

// Import API Routes
require('./api')(app);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
