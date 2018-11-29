/* eslint-disable import/no-unresolved, node/no-unpublished-require, node/no-missing-require */

const request = require('request-promise');
const config = require('../../config');

const getToken = () =>
  request({
    method: 'post',
    url: 'https://api.oregonstate.edu/oauth2/token',
    json: true,
    form: {
      client_id: config.oauth.clientId,
      client_secret: config.oauth.clientSecret,
      grant_type: 'client_credentials'
    }
  }).then(data => data.access_token);

module.exports = {
  getToken
};
