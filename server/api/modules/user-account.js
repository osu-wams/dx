const { pool, dbQuery } = require('../../db');

const findOrCreateUser = async u => {
  let isNew = false;
  let user = await pool.query(dbQuery.selectUser, [u.osuId]);
  console.log(user[0]); // eslint-disable-line no-console
  if (user.length == 0) {
    user = await pool.query(dbQuery.insertUser, [u.osuId, u.firstName, u.lastName, u.email]);
    await pool.query(dbQuery.insertOAuthOptIn, [u.osuId, false]);
    isNew = true;
  } else {
    user = user[0];
  }
  return { user, isNew };
};

const updateOAuthOptIn = async (user, optIn) => {
  try {
    const result = await pool.query(dbQuery.updateOAuthOptIn, [optIn, user.osuId]);
    if (result.length > 0) {
      return;
    }
  } catch (err) {
    // TODO: Add logging for errors
    throw err;
  }
};

const updateOAuthToken = async (user, account) => {
  try {
    const result = await pool.query(dbQuery.updateOAuthTokens, [account.refreshToken, user.osuId]);
    if (result.length > 0) {
      return;
    }
  } catch (err) {
    // TODO: Add logging for errors
    throw err;
  }
};

module.exports = { updateOAuthToken, updateOAuthOptIn, findOrCreateUser };
