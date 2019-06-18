const supertest = require('supertest');
const nock = require('nock');
const app = require('../../index');
const { resourcesData, categoriesData, emptyData } = require('../__mocks__/resources.data');

const BASE_URL = 'http://dev-api-dx.pantheonsite.io';
let request = supertest.agent(app);

describe('/resources', () => {
  it('should contain an icon when one exists', async () => {
    // Mock response from Handshake - query parameters must be an exact match
    nock(BASE_URL)
      .get(/.*/)
      .reply(200, resourcesData, { 'Content-Type': 'application/json' });

    const res = await request.get(
      '/api/resources?category=1b9b7a4b-5a64-41af-a40a-8bb01abedd19,e2730988-0614-43b7-b3ce-0b047e8219e0'
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('attributes.icon');
  });

  it('should return a 500 if the site is down', async () => {
    nock(BASE_URL)
      .get(/.*/)
      .reply(500);

    const res = await request.get('/api/resources');
    expect(res.statusCode).toEqual(500);
  });

  it('should return elements with the matching name', async () => {
    nock(BASE_URL)
      .get(/.*/)
      .reply(200, resourcesData, { 'Content-Type': 'application/json' });

    const res1 = await request.get('/api/resources?query=Student');
    expect(res1.statusCode).toEqual(200);
    expect(res1.body).toHaveLength(1);

    nock(BASE_URL)
      .get(/.*/)
      .reply(200, emptyData, { 'Content-Type': 'application/json' });

    const res2 = await request.get('/api/resources?query=Students');
    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toHaveLength(0);
  });

  describe('/resources/categories', () => {
    it('should contain an icon when one exists', async () => {
      nock(BASE_URL)
        .get(/.*/)
        .reply(200, categoriesData, { 'Content-Type': 'application/json' });

      const res = await request.get('/api/resources/categories');
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty('attributes.icon');
    });

    it('should return a 500 if the site is down', async () => {
      nock(BASE_URL)
        .get(/.*/)
        .reply(500);

      const res = await request.get('/api/resources/categories');
      expect(res.statusCode).toEqual(500);
    });
  });
});
