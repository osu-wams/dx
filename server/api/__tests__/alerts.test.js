const supertest = require('supertest');
const nock = require('nock');
const config = require('config');
const app = require('../../index');
const { alertClear, alertPresent } = require('../__mocks__/alerts.data');

const BASE_URL = config.get('raveApi.baseUrl');
let request = supertest.agent(app);

describe('/alerts', () => {
  it('should return an alert when one is present', async () => {
    // Mock response from Handshake - query parameters must be an exact match
    nock(BASE_URL)
      .get('')
      .reply(200, alertPresent.xml, { 'Content-Type': 'application/xml' });

    const res = await request.get('/api/alerts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(alertPresent.response);
  });

  it('should return an empty array [] when "All Clear" is present in the data', async () => {
    // Mock response from Handshake - query parameters must be an exact match
    nock(BASE_URL)
      .get('')
      .reply(200, alertClear.xml, { 'Content-Type': 'application/xml' });

    const res = await request.get('/api/alerts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(alertClear.response);
  });

  it('should return "Unable to retrieve alerts." when there is a 500 error', async () => {
    nock(BASE_URL)
      .get('')
      .reply(500);

    const res = await request.get('/api/alerts');
    expect(res.error.text).toEqual('Unable to retrieve alerts.');
  });
});
