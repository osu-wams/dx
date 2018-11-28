/* eslint-disable consistent-return, node/no-unpublished-require, node/no-missing-require */

const SamlStrategy = require('passport-saml').Strategy;
const DevStrategy = require('passport-dev').Strategy;

const ENV = process.env.NODE_ENV || 'development';

const Auth = {};

function parseSamlResult(user, done) {
  const samlUser = {
    email: user['urn:oid:1.3.6.1.4.1.5923.1.1.1.6'],
    firstName: user['urn:oid:2.5.4.42'],
    lastName: user['urn:oid:2.5.4.4']
  };

  let permissions = user['urn:oid:1.3.6.1.4.1.5923.1.1.1.7'] || [];
  if (!Array.isArray(permissions)) {
    permissions = [permissions];
  }

  samlUser.permissions = permissions;

  return done(null, samlUser);
}

if (ENV === 'production') {
  Auth.passportStrategy = new SamlStrategy(
    {
      acceptedClockSkewMs: 500,
      disableRequestedAuthnContext: true,
      callbackUrl: '/login/saml',
      logoutUrl: 'https://login.oregonstate.edu/idp-dev/profile/Logout',
      entryPoint: 'https://login.oregonstate.edu/idp-dev/profile/SAML2/Redirect/SSO',
      issuer: '',
      cert: ''
    },
    parseSamlResult
  );
} else {
  // Configure Dev Strategy
  Auth.passportStrategy = new DevStrategy('saml', {
    email: 'fake-email@oregonstate.edu',
    firstName: 'Test',
    lastName: 'User',
    permissions: ['wams-admin'],
    osuId: 111111111
  });
}

Auth.serializeUser = (user, done) => {
  done(null, user);
};

Auth.deserializeUser = (user, done) => {
  done(null, user);
};

Auth.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('https://login.oregonstate.edu/idp-dev/profile/Logout');
};

Auth.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send('Unauthorized');
};

Auth.ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.permissions.includes('wams-admin')) {
    return next();
  }

  return res.status(401).send('Unauthorized');
};

module.exports = Auth;
