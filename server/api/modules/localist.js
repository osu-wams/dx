const request = require('request-promise');
const Parser = require('rss-parser');
const querystring = require('querystring');
const config = require('config');

const parser = new Parser();

const LOCALIST_BASE_URL = config.get('localist.baseUrl');
const ACADEMIC_CALENDAR_URL = config.get('localist.academicCalendarRSS');

/**
 * Gets events from Localist.
 * @param {Object} query - An object containing key/value pairs to be used as query parameters.
 * @returns {Promise<Object[]>}
 */
const getEvents = async query => {
  try {
    const urlParams = querystring.stringify(query);
    const data = await request(`${LOCALIST_BASE_URL}/events?${urlParams}`, { json: true });
    if (urlParams) {
      return data.events;
    } else {
      return data;
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Gets academic calendar events from Localist.
 * @returns {Promise<Object[]>}
 */
const getAcademicCalendarEvents = async () => {
  try {
    // Note: Getting academic calendar items via RSS as a workaround due to
    //       unlisted/restricted events not being visible via API.
    const { items } = await parser.parseURL(ACADEMIC_CALENDAR_URL);

    return items;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getEvents,
  getAcademicCalendarEvents
};
