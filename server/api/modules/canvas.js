const request = require('request-promise');
const config = require('config');

const CANVAS_BASE_URL = config.get('canvasApi.baseUrl');
const CANVAS_TOKEN = config.get('canvasApi.token');

const getUpcomingAssignments = osuId => {
  return request({
    method: 'GET',
    url: `${CANVAS_BASE_URL}/users/self/upcoming_events?as_user_id=sis_user_id:${osuId}`,
    auth: { bearer: CANVAS_TOKEN }
  });
};

module.exports = {
  getUpcomingAssignments
};
