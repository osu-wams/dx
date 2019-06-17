const supertest = require('supertest');
const app = require('../index');

let request = supertest.agent(app);

describe('/login', () => {
  it('should return 401 if not logged in', async () => {
    const res = await request.get('/api/user');
    expect(res.status).toEqual(401);
  });

  it('should return a 302 and redirect to root', async () => {
    const res = await request.get('/login');
    expect(res.status).toEqual(302);
    expect(res.text).toEqual('Found. Redirecting to /');
  });

  it('should return our dev user', async () => {
    await request.get('/login');
    const res = await request.get('/api/user');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      email: 'fake-email@oregonstate.edu',
      firstName: 'Test',
      lastName: 'User',
      permissions: ['urn:mace:oregonstate.edu:entitlement:dx:dx-admin'],
      osuId: 111111111,
      isAdmin: true
    });
  });
});
