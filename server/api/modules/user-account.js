const { pool, dbQuery } = require('../../db');

const findOrCreateUser = async u => {
  let isNew = false;
  let user = await pool.query(dbQuery.selectUser, [u.osuId]);
  console.log(user[0]);
  if (user.length == 0) {
    user = await pool.query(dbQuery.insertUser, [u.osuId, u.firstName, u.lastName, u.email]);
    await pool.query(dbQuery.insertOAuthOptIn, [u.osuId, false]);
    isNew = true;
  } else {
    user=user[0]
  }
  return {user, isNew};

  // pool.getConnection((err, connection) => {
  //   if (err) throw err;
  //   connection.query(dbQuery.selectUser, [req.user.osuId], (err, results) => {
  //     if (err) throw err;
  //     if (results.length == 0) {
  //       // Initialize user object in database.
  //       connection.query(
  //         dbQuery.insertUser,
  //         [req.user.osuId, req.user.firstName, req.user.lastName, req.user.email],
  //         err => {
  //           if (err) throw err;
  //         }
  //       );
  //       // Insert into oauth data
  //       connection.query(dbQuery.insertOAuthOptIn, [req.user.osuId, false], err => {
  //         if (err) throw err;
  //       });
  //       req.user.isCanvasOptIn = false;
  //       connection.release();
  //       res.redirect('/canvas/login');
  //     } else {
  //       connection.query(dbQuery.getOptInStatus, [req.user.osuId], (err, results) => {
  //         if (err) throw err;
  //         if (results.length == 0) {
  //           console.error('we got a problem');
  //         }
  //         if (results[0].opt_in) {
  //           getCurrentOauthToken(req.user.osuId, results => {
  //             req.user.canvasOauthToken = results.accessToken;
  //             req.user.canvasOauthExpire = results.expireTime;
  //             req.user.isCanvasOptIn = true;
  //             res.redirect('/');
  //           });
  //         } else {
  //           req.user.isCanvasOptIn = false;
  //           res.redirect('/');
  //         }
  //       });
  //       connection.release();
  //     }
  //   });
  // });
}

module.exports = { findOrCreateUser }