const supertest = require('supertest');
const nock = require('nock');
const config = require('config');
const app = require('../../index');
const { personsData } = require('../__mocks__/persons.data');

jest.mock('../util.js');

const APIGEE_BASE_URL = config.get('osuApi.baseUrl');
let request = supertest.agent(app);

describe('/api/persons', () => {
  beforeEach(async () => {
    // Authenticate before each request
    await request.get('/login');
  });

  describe('/', () => {
    it('should return person general information', async () => {
      // Mock response from Apigee
      nock(APIGEE_BASE_URL)
        .get(/persons\/[0-9]/)
        .query(true)
        .reply(200, personsData);

      const res = await request.get('/api/persons/');
      expect(res.statusCode).toEqual(200);
      expect(res.body.attributes.firstName).toEqual('Testo');
    });

    it('should return an error if the user is not logged in', async () => {
      // Clear session data - we don't want to be logged in
      request = supertest.agent(app);

      const res = await request.get('/api/persons/');
      expect(res.statusCode).toEqual(401);
      expect(res.error.text).toEqual('Unauthorized');
    });
  });

  // Meal Plan Balances
  describe('/meal-plans', () => {
    it('should return meal plans', async () => {
      // Mock response from apigee
      nock(APIGEE_BASE_URL)
        .get(/persons\/[0-9]+\/meal-plans/)
        .query(true)
        .reply(200, { data: { plan: 'Orange Rewards' } });

      const res = await request.get('/api/persons/meal-plans');
      expect(res.statusCode).toEqual(200);
      expect(res.body.plan).toEqual('Orange Rewards');
    });

    it('should return an error if the user is not logged in', async () => {
      // Clear session data - we don't want to be logged in
      request = supertest.agent(app);

      const res = await request.get('/api/persons/meal-plans');
      expect(res.statusCode).toEqual(401);
      expect(res.error.text).toEqual('Unauthorized');
    });
  });
});
