const supertest = require('supertest');
const nock = require('nock');
const config = require('config');
const app = require('../../index');
const JobsMockResponse = require('../__mocks__/jobs-response');

const HANDSHAKE_BASE_URL = config.get('handshakeApi.baseUrl');
let request = supertest.agent(app);

describe('/api/jobs', () => {
  beforeEach(async () => {
    // Authenticate before each request
    await request.get('/login');
  });

  describe('/jobs', () => {
    it('should return a list of jobs', async () => {
      // Mock response from Handshake - query parameters must be an exact match
      nock(HANDSHAKE_BASE_URL)
        .get(/jobs/)
        .query({
          per_page: 50
        })
        .reply(200, {
          success: true,
          jobs: JobsMockResponse
        });

      const res = await request.get('/api/jobs');
      expect(res.statusCode).toEqual(200);
      expect(res.body.jobs).toEqual(JobsMockResponse);
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
