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
  localist: {
    baseUrl: 'https://events.oregonstate.edu/api/2',
    academicCalendarRSS:
      'https://events.oregonstate.edu/widget/view?schools=oregonstate&days=365&num=10&tags=academic+calendar&format=rss'
  },
  saml: {
    cert: '',
    pvk: '',
    callbackUrl: '',
    logoutCallbackUrl: ''
  },
  redis: {
    host: '',
    port: ''
  }
};
