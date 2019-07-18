module.exports = {
  osuApi: {
    clientId: 'OSU_API_CLIENT_ID',
    clientSecret: 'OSU_API_CLIENT_SECRET'
  },
  canvasApi: {
    token: 'CANVAS_API_TOKEN'
  },
  saml: {
    cert: 'SAML_CERT',
    pvk: 'SAML_PVK',
    callbackUrl: 'SAML_CALLBACK_URL'
  },
  handshakeApi: {
    token: 'HANDSHAKE_API_TOKEN'
  },
  redis: {
    host: 'REDIS_HOST',
    port: 'REDIS_PORT'
  },
  rds: {
    host: 'RDS_HOST',
    port: 'RDS_PORT',
    user: 'RDS_USER',
    password: 'RDS_PASS',
    database: 'RDS_DB'
  },
  canvasOauth: {
    id: 'CANVAS_OAUTH_ID',
    secret: 'CANVAS_OAUTH_SECRET',
    callbackUrl: 'CANVAS_OAUTH_CALLBACK'
  }
};
