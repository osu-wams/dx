module.exports = {
  env: process.env.NODE_ENV || 'development',
  osuApi: {
    clientId: '',
    clientSecret: '',
    baseUrl: 'https://oregonstateuniversity-dev.apigee.net/v1'
  },
  canvasApi: {
    token: '',
    baseUrl: 'https://oregonstate.test.instructure.com/api/v1'
  },
  handshakeApi: {
    token: '',
    baseUrl: 'https://app.joinhandshake.com/api/v1'
  },
  raveApi: {
    baseUrl: 'https://www.getrave.com/rss/oregonstate/channel2'
  },
  saml: {
    cert: '',
    pvk: '',
    callbackUrl: ''
  },
  redis: {
    host: '',
    port: ''
  }
};
