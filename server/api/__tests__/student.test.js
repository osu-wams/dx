const supertest = require('supertest');
const nock = require('nock');
const config = require('config');
const app = require('../../index');

jest.mock('../util.js');

const APIGEE_BASE_URL = config.get('osuApi.baseUrl');
let request = supertest.agent(app);

describe('/api/student', () => {
  beforeEach(async () => {
    // Authenticate before each request
    await request.get('/login');
  });

  describe('/academic-status', () => {
    it('should return academic status data for the current user', async () => {
      // Mock response from Apigee
      nock(APIGEE_BASE_URL)
        .get(/v1\/students\/[0-9]+\/academic-status/)
        .query(true)
        .reply(200, { data: ['academic-status'] });

      const res = await request.get('/api/student/academic-status');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(['academic-status']);
    });

    it('should return data for a specified term, or the current term if none provided', async () => {
      // Mock default (term=current) response
      nock(APIGEE_BASE_URL)
        .get(/v1\/students\/[0-9]+\/academic-status/)
        .query(true)
        .reply(200, { data: { term: 'current' } })
        // Mock specified term response
        .get(/v1\/students\/[0-9]+\/academic-status/)
        .query({ term: '201701' })
        .reply(200, { data: { term: '201701' } });

      // Get current term
      let res = await request.get('/api/student/academic-status');
      expect(res.statusCode).toEqual(200);
      expect(res.body.term).toEqual('current');

      // Get specified term
      res = await request.get('/api/student/academic-status?term=201701');
      expect(res.statusCode).toEqual(200);
      expect(res.body.term).toEqual('201701');
    });

    it('should return an error if the user is not logged in', async () => {
      // Clear session data - we don't want to be logged in
      request = supertest.agent(app);

      const res = await request.get('/api/student/academic-status');
      expect(res.statusCode).toEqual(401);
      expect(res.error.text).toEqual('Unauthorized');
    });
  });

  describe('/account-balance', () => {
    it('should return account balance data for the current user', async () => {
      // Mock response from Apigee
      nock(APIGEE_BASE_URL)
        .get(/v1\/students\/[0-9]+\/account-balance/)
        .reply(200, { data: ['account-balance'] });

      const res = await request.get('/api/student/account-balance');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(['account-balance']);
    });

    it('should return an error if the user is not logged in', async () => {
      // Clear session data - we don't want to be logged in
      request = supertest.agent(app);

      const res = await request.get('/api/student/account-balance');
      expect(res.statusCode).toEqual(401);
      expect(res.error.text).toEqual('Unauthorized');
    });
  });

  describe('/class-schedule', () => {
    it('should return current term course schedule for the current user', async () => {
      // Mock response from Apigee
      nock(APIGEE_BASE_URL)
        .get(/v1\/students\/[0-9]+\/class-schedule/)
        .reply(200, { data: ['class-schedule'] });

      const res = await request.get('/api/student/class-schedule');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(['class-schedule']);
    });

    it('should return an error if the user is not logged in', async () => {
      // Clear session data - we don't want to be logged in
      request = supertest.agent(app);

      const res = await request.get('/api/student/class-schedule');
      expect(res.statusCode).toEqual(401);
      expect(res.error.text).toEqual('Unauthorized');
    });
  });

  describe('/gpa', () => {
    it('should return GPA data for the current user', async () => {
      // Mock response from Apigee
      nock(APIGEE_BASE_URL)
        .get(/v1\/students\/[0-9]+\/gpa/)
        .reply(200, { data: ['gpa'] });

      const res = await request.get('/api/student/gpa');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(['gpa']);
    });

    it('should return an error if the user is not logged in', async () => {
      // Clear session data - we don't want to be logged in
      request = supertest.agent(app);

      const res = await request.get('/api/student/class-schedule');
      expect(res.statusCode).toEqual(401);
      expect(res.error.text).toEqual('Unauthorized');
    });
  });

  describe('/grades', () => {
    it('should return grades for the current user', async () => {
      // Mock response from Apigee
      nock(APIGEE_BASE_URL)
        .get(/v1\/students\/[0-9]+\/grades/)
        .query(true)
        .reply(200, { data: ['grades'] });

      const res = await request.get('/api/student/grades');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(['grades']);
    });

    it('should return grades for a specified term, or the current term if none provided', async () => {
      // Mock default (term=current) response
      nock(APIGEE_BASE_URL)
        .get(/v1\/students\/[0-9]+\/grades/)
        .query(true)
        .reply(200, { data: { term: 'current' } })
        // Mock specified term response
        .get(/v1\/students\/[0-9]+\/grades/)
        .query({ term: '201701' })
        .reply(200, { data: { term: '201701' } });

      let res = await request.get('/api/student/grades');
      expect(res.statusCode).toEqual(200);
      expect(res.body.term).toEqual('current');

      res = await request.get('/api/student/grades?term=201701');
      expect(res.statusCode).toEqual(200);
      expect(res.body.term).toEqual('201701');
    });

    it('should return an error if the user is not logged in', async () => {
      // Clear session data - we don't want to be logged in
      request = supertest.agent(app);

      const res = await request.get('/api/student/grades');
      expect(res.statusCode).toEqual(401);
      expect(res.error.text).toEqual('Unauthorized');
    });
  });

  describe('/holds', () => {
    it('should return account holds for the current user', async () => {
      // Mock response from Apigee
      nock(APIGEE_BASE_URL)
        .get(/v1\/students\/[0-9]+\/holds/)
        .reply(200, { data: ['holds'] });

      const res = await request.get('/api/student/holds');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(['holds']);
    });

    it('should return an error if the user is not logged in', async () => {
      // Clear session data - we don't want to be logged in
      request = supertest.agent(app);

      const res = await request.get('/api/student/holds');
      expect(res.statusCode).toEqual(401);
      expect(res.error.text).toEqual('Unauthorized');
    });
  });
});
