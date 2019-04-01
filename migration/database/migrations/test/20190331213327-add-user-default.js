"use strict";

let dbm;
let type;
let seed;

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
  return db.runSql(
    `INSERT INTO \`user\` VALUES (1,'Michel Pedroso','michelspedroso@gmail.com','$2b$08$VxXwUuU2AEZ/5C925s7AYOdqbY7mpAZVlLlbbmQIQN08qwKLsJyui','$2b$08$VxXwUuU2AEZ/5C925s7AYO',NOW(),NULL)`
  );
};

exports.down = function(db) {
  return db.runSql(
    `DELETE FROM \`user\` WHERE \`email\` = 'michelspedroso@gmail.com'`
  );
};

exports._meta = {
  version: 1
};
