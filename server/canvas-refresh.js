const config = require('config');
const request = require('request-promise');
const querystring = require('querystring');
const { pool, dbQuery } = require('./db');

// If token is valid return token else refresh and return the updated token
const getCurrentOauthToken = (osuId, callback) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(dbQuery.selectOAuth, [osuId], (error, results) => {
      if (error) throw error;

      const refresh = performRefresh(results[0].refresh_token);

      refresh
        .then(body => {
          const response = JSON.parse(body);
          const expireTime = ((Date.now() / 1000) | 0) + response.expires_in;
          connection.release();
          return callback({ accessToken: response.access_token, expireTime: expireTime });
        })
        .catch(err => {
          console.log(err);
          // Stuff expired / deauthorized
          // ! Delete refresh_token
          // ! setOptIn to false
          // redirect, etc etc.
        });
    });
  });
};
/**
 * Performs a oauth2 token refresh against canvas.
 * @param {string} refreshToken
 */
const performRefresh = refreshToken => {
  const query = querystring.stringify({
    grant_type: 'refresh_token',
    client_id: config.get('canvasOauth.id'),
    client_secret: config.get('canvasOauth.secret'),
    refresh_token: refreshToken
  });
  const options = {
    method: 'POST',
    uri: `${config.get('canvasOauth.tokenUrl')}?${query}`
  };
  return request(options);
};

module.exports = { getCurrentOauthToken };
