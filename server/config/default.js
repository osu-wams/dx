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
  saml: {
    cert: '',
    pvk: ''
  }
};
