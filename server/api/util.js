/* eslint-disable import/no-unresolved, node/no-unpublished-require, node/no-missing-require */

const request = require('request-promise');
const config = require('config');

const CLIENT_ID = config.get('osuApi.clientId');
const CLIENT_SECRET = config.get('osuApi.clientSecret');

const getToken = () =>
  request({
    method: 'post',
    url: 'https://api.oregonstate.edu/oauth2/token',
    json: true,
    form: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    }
  }).then(data => data.access_token);

module.exports = {
  getToken
};
