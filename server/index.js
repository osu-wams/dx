/* eslint-disable no-console, no-unused-vars */

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('config');
const logger = require('./logger');
const auth = require('./auth');
const { findOrCreateUser } = require('./api/modules/user-account')
const { pool, dbQuery } = require('./db');
const { getCurrentOauthToken } = require('./canvas-refresh');

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
// Configure Redis session store
if (config.get('env') === 'production') {
  sessionOptions.store = new RedisStore({
    host: config.get('redis.host'),
    port: config.get('redis.port'),
    logErrors: true
  });
}

// app.use(session(sessionOptions));
app.use(session(sessionOptions));

// Configure Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(auth.passportStrategy);
passport.use('canvasOauth', auth.oAuth2Strategy);

passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

app.get('/login', auth.login);
app.get('/logout', auth.logout);

// Health Check (path configured in cloudformation template)
app.get('/healthcheck', (req, res) => {
  console.log('Health Check Request');
  res.status(200).end();
});

app.post('/login/saml', passport.authenticate('saml'), async (req, res) => {
  // find by id or create
  const [isNew] = await findOrCreateUser(req.user);
  if (isNew) {
    res.redirect('/canvas/login');
  } else {
    res.redirect('/canvas/refresh');
  }
});
// Canvas Oauth2 login route
app.get('/canvas/login', passport.authorize('canvasOauth'));
// Canvas Oauth2 login call back route

app.get(
  '/canvas/auth',
  passport.authorize('canvasOauth', { failWithError: true }),
  (err, req, res, next) => {
    // Handle the error when the user denies access
    if (err.name === 'AuthenticationError') {
      pool.query(dbQuery.updateOAuthOptIn, [false, req.user.osuId], error => {
        if (error) throw error;
      });
    }
    req.user.isCanvasOptIn = false;
    res.redirect('/');
  },
  (req, res) => {
    // Add the users refresh token to the database.
    pool.query(dbQuery.updateOAuthTokens, [req.account.refreshToken, req.user.osuId], error => {
      if (error) throw error;
    });
    // Add the access token and expire time to the user object
    req.user.canvasOauthToken = req.account.accessToken;
    req.user.canvasOauthExpire = req.account.expireTime;
    req.user.isCanvasOptIn = true;
    res.redirect('/');
  }
);
app.get('/canvas/refresh', async (req, res) => {
  let myUser = await getCurrentOauthToken(req.user);
  req.user = myUser;
  res.redirect('/');
})
// Import API Routes
require('./api')(app);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
}

module.exports = app;
