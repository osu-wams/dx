const request = require('request-promise');
const config = require('config');
const format = require('date-fns/format');

const CANVAS_BASE_URL = config.get('canvasApi.baseUrl');
const CANVAS_TOKEN = config.get('canvasApi.token');

/**
 * Gets upcoming assignments.
 * @param {Number} osuId - The OSU ID of the student to retrieve assignments for.
 * @returns {Promise<Object[]>}
 */

const getPlannerItemsMask = maskId => {
  const today = format(Date.now(), 'YYYY-MM-DD');
  console.log(today);
  return request({
    method: 'GET',
    url: `${CANVAS_BASE_URL}/planner/items?as_user_id=sis_user_id:${maskId}&start_date=${today}`,
    auth: { bearer: CANVAS_TOKEN }
  });
};

// @TODO: start day to change today.
const getPlannerItemsOAuth = accessToken => {
  const today = format(Date.now(), 'YYYY-MM-DD');
  return request({
    method: 'GET',
    url: `${CANVAS_BASE_URL}/planner/items?start_date=${today}`,
    auth: { bearer: accessToken }
  });
};

module.exports = {
  getPlannerItemsMask,
  getPlannerItemsOAuth
};
