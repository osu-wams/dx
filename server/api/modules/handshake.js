const request = require('request-promise');
const config = require('config');

const HANDSHAKE_BASE_URL = config.get('handshakeApi.baseUrl');
const HANDSHAKE_TOKEN = config.get('handshakeApi.token');

/**
 * Gets jobs.
 * @returns {Promise<Object[]>}
 */
const getJobs = () => {
  return request({
    method: 'GET',
    url: `${HANDSHAKE_BASE_URL}/jobs?per_page=50`,
    auth: { bearer: HANDSHAKE_TOKEN },
    json: true
  });
};

module.exports = {
  getJobs
};
