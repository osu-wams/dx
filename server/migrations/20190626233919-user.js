'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db
    .createTable('users', {
      osu_id: { type: 'int', primaryKey: true },
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      phone: 'bigint'
    })
    .then(
      result => {
        db.createTable('oauth_data', {
          osu_id: {
            type: 'int',
            notNull: true,
            unique: true,
            foreignKey: {
              table: 'users',
              name: 'users_osuid',
              mapping: 'osu_id',
              rules: {
                onUpdate: 'RESTRICT',
                onDelete: 'CASCADE'
              }
            }
          },
          refresh_token: {
            type: 'string',
            length: 4096
          },
          opt_in: 'boolean'
        });
      },
      err => {
        return;
      }
    );
};

exports.down = function(db) {
  return db.dropTable('oauth_data').then(
    result => {
      db.dropTable('users');
    },
    err => {
      return;
    }
  );
};

exports._meta = {
  version: 1
};
