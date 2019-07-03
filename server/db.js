const mysql = require('mysql');
const config = require('config');
// Configure RDS store
const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.get('rds.host'),
  port: config.get('rds.port'),
  user: config.get('rds.user'),
  password: config.get('rds.password'),
  database: config.get('rds.database')
});

// Query object for our users and oauth tables manipulations
const dbQuery = {
  selectUser: 'SELECT * FROM users WHERE osu_id = ?',
  insertUser: 'INSERT INTO users (osu_id, first_name, last_name, email) VALUES (?, ?, ?, ?)',
  selectOAuth: 'SELECT * FROM oauth_data WHERE osu_id = ?',
  insertOAuthOptIn: 'INSERT INTO oauth_data (osu_id, opt_in) VALUES (?, ?)',
  insertOauthData: 'INSERT INTO oauth_data (osu_id, refresh_token, opt_in) VALUES (?, ?, ?)',
  updateOAuthOptIn: 'UPDATE oauth_data SET opt_in = ?, refresh_token = NULL WHERE osu_id = ?',
  updateOAuthTokens: 'UPDATE oauth_data SET refresh_token = ?, opt_in = 1 WHERE osu_id = ?',
  updateOAuthAccessToken: 'UPDATE oauth_data SET refresh_token = ?, WHERE osu_id = ?',
  getOptInStatus: 'SELECT opt_in FROM oauth_data WHERE osu_id = ?'
};

module.exports = { pool, dbQuery };
