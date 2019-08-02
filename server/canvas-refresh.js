const config = require('config');
const request = require('request-promise');
const querystring = require('querystring');
const logger = require('./logger');
const { pool, dbQuery } = require('./db');

// If token is valid return token else refresh and return the updated token
const getCurrentOauthToken = async user => {
  // if not expired return user object else perform refresh update user object then return
  if (((Date.now() / 1000) | 0) > user.canvasOauthExpire) {
    let results = await pool.query(dbQuery.selectOAuth, [user.osuId]);
    // if (error) throw error;
    console.log('Token before refreshing ' + user.canvasOauthToken);
    if (results) {
      user = await performRefresh(user, results[0].refresh_token);
      return user;
    }
    // await pool.getConnection((err, connection) => {
    //   if (err) throw err;
    //   connection.query(dbQuery.selectOAuth, [user.osuId], (error, results) => {
    //     if (error) throw error;
    //     console.log('Token before refreshing ' + user.canvasOauthToken);
    //     const refresh = performRefresh(results[0].refresh_token);

    //     refresh
    //       .then(body => {
    //         const response = JSON.parse(body);
    //         const expireTime = ((Date.now() / 1000) | 0) + response.expires_in;
    //         user.canvasOauthToken = response.access_token;
    //         user.canvasOauthExpire = expireTime;
    //         user.isCanvasOptIn = true;
    //         console.log('Token after refreshing ' + user.canvasOauthToken);
    //         connection.release();
    //         console.log(user);
    //         return user;
    //         // return callback({
    //         //   accessToken: response.access_token,
    //         //   expireTime: expireTime,
    //         //   canvasOptIn: true
    //         // });
    //       })
    //       // .catch(err => {
    //         .error( err => {
    //         logger.error(err);
    //         // Refresh token is no longer valid and we must update the database
    //         connection.query(dbQuery.updateOAuthOptIn, [false, osuId], (error, results) => { });
    //         connection.release();
    //         user.canvasOauthToken = null;
    //         user.canvasOauthExpire = null;
    //         user.isCanvasOptIn = false;
    //         return user;
    //         // return callback({ accessToken: null, expireTime: null, canvasOptIn: false });
    //       });
    //   });
    // });
  } else {
    console.log('No refreshing needed');
    return await user;
  }

};
/**
 * Performs a oauth2 token refresh against canvas.
 * @param {string} refreshToken
 */
const performRefresh = async (user, refreshToken) => {
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
  // return await request(options);
  try {
    let body = await request(options);
    const response = JSON.parse(body);
    const expireTime = ((Date.now() / 1000) | 0) + response.expires_in;
    user.canvasOauthToken = response.access_token;
    user.canvasOauthExpire = expireTime;
    user.isCanvasOptIn = true;
    console.log('Token after refreshing ' + user.canvasOauthToken);
    // console.log(user);
    return user;
  } catch (err) { // .catch(err => {
    // .error( err => {
    logger.error(err);
    // Refresh token is no longer valid and we must update the database
    await pool.query(dbQuery.updateOAuthOptIn, [false, user.osuId]);
    user.canvasOauthToken = null;
    user.canvasOauthExpire = null;
    user.isCanvasOptIn = false;
    return user;
    // return callback({ accessToken: null, expireTime: null, canvasOptIn: false });
  };
};

module.exports = { getCurrentOauthToken };
