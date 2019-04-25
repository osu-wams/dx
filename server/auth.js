/* eslint-disable consistent-return, node/no-unpublished-require, node/no-missing-require */

const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const DevStrategy = require('passport-dev').Strategy;
const config = require('config');

const ENV = config.get('env');
const SAML_CERT = config.get('saml.cert');
let SAML_PVK = config.get('saml.pvk');
// Need to replace the newlines pulled from environment variable with actual
// newlines, otherwise passport-saml breaks.
SAML_PVK = SAML_PVK.replace(/\\n/g, '\n');
const SAML_CALLBACK_URL = config.get('saml.callbackUrl');
const Auth = {};

function parseSamlResult(user, done) {
  const samlUser = {
    email: user['urn:oid:1.3.6.1.4.1.5923.1.1.1.6'],
    firstName: user['urn:oid:2.5.4.42'],
    lastName: user['urn:oid:2.5.4.4'],
    isAdmin: false
  };

  let permissions = user['urn:oid:1.3.6.1.4.1.5923.1.1.1.7'] || [];
  if (permissions.includes('urn:mace:oregonstate.edu:entitlement:dx:dx-admin')) {
    samlUser.isAdmin = true;
  }

  return done(null, samlUser);
}

if (ENV === 'production') {
  Auth.passportStrategy = new SamlStrategy(
    {
      acceptedClockSkewMs: 500,
      disableRequestedAuthnContext: true,
      identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
      callbackUrl: SAML_CALLBACK_URL,
      logoutUrl: 'https://login.oregonstate.edu/idp/profile/Logout',
      entryPoint: 'https://login.oregonstate.edu/idp/profile/SAML2/Redirect/SSO',
      issuer: 'https://my.oregonstate.edu',
      cert: SAML_CERT,
      privateCert: SAML_PVK,
      decryptionPvk: SAML_PVK,
      signatureAlgorithm: 'sha256'
    },
    parseSamlResult
  );
} else {
  // Configure Dev Strategy
  Auth.passportStrategy = new DevStrategy('saml', {
    email: 'fake-email@oregonstate.edu',
    firstName: 'Test',
    lastName: 'User',
    permissions: ['urn:mace:oregonstate.edu:entitlement:dx:dx-admin'],
    osuId: 111111111,
    isAdmin: true
  });
}

Auth.serializeUser = (user, done) => {
  done(null, user);
};

Auth.deserializeUser = (user, done) => {
  done(null, user);
};

Auth.login = function(req, res, next) {
  return passport.authenticate('saml', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(400, {
        message: 'Bad username or password'
      });
    }

    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  })(req, res, next);
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
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }

  return res.status(401).send('Unauthorized');
};

module.exports = Auth;
