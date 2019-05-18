const supertest = require('supertest');
const nock = require('nock');
const config = require('config');
const app = require('../../index');

jest.mock('../util.js');

const HANDSHAKE_BASE_URL = config.get('handshakeApi.baseUrl');
let request = supertest.agent(app);

describe('/api/jobs', () => {
  beforeEach(async () => {
    // Authenticate before each request
    await request.get('/login');
  });

  describe('/jobs', () => {
    it('should return a list of jobs', async () => {
      // Mock response from Handshake
      nock(HANDSHAKE_BASE_URL)
        .get('/jobs')
        .reply(200, 'jobs');

      const res = await request.get('/api/jobs');
      // console.log(res.statusCode);
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('jobs');
    });

    it('should return an error if the user is not logged in', async () => {
      // Clear session data - we don't want to be logged in
      request = supertest.agent(app);

      const res = await request.get('/api/jobs');
      expect(res.statusCode).toEqual(401);
      expect(res.error.text).toEqual('Unauthorized');
    });
  });
});
