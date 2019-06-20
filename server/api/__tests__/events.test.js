const supertest = require('supertest');
const nock = require('nock');
const config = require('config');
const app = require('../../index');
const { academicCalendarData } = require('../__mocks__/events-academic.data');
const { eventsData } = require('../__mocks__/events.data');

const LOCALIST_BASE_URL = config.get('localist.baseUrl');
const ACADEMIC_CALENDAR_URL = config.get('localist.academicCalendarRSS');

let request = supertest.agent(app);

describe('/events', () => {
  it('should return events when one is present', async () => {
    // Mock response from Localist
    nock(LOCALIST_BASE_URL, { encodedQueryParams: true })
      .get('/events')
      .query(true)
      .reply(200, { eventsData });

    const res = await request.get('/api/events');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ eventsData });
  });

  it('should return "Unable to retrieve events." when there is a 500 error', async () => {
    nock(LOCALIST_BASE_URL)
      .get('')
      .reply(500);

    const res = await request.get('/api/events');
    expect(res.error.text).toEqual('Unable to retrieve events.');
  });
});

describe('/events/academic-calendar', () => {
  it('should return events when one is present', async () => {
    // Mock response from Localist
    nock(ACADEMIC_CALENDAR_URL)
      .get('')
      .query(true)
      .reply(200, academicCalendarData.xml, { 'Content-Type': 'application/xml' });

    const res = await request.get('/api/events/academic-calendar');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(academicCalendarData.response);
  });

  it('should return "Unable to retrieve academic calendar events." when there is a 500 error', async () => {
    nock(ACADEMIC_CALENDAR_URL)
      .get('')
      .reply(500);

    const res = await request.get('/api/events/academic-calendar');
    expect(res.error.text).toEqual('Unable to retrieve academic calendar events.');
  });
});
