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
  return db.runSql(`
    DROP TABLE IF EXISTS \`post\`;
    CREATE TABLE \`post\` (
      \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
      \`user_id\` int(11) unsigned NOT NULL,
      \`text\` varchar(255) NOT NULL DEFAULT '',
      \`created\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updated\` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      CONSTRAINT \`post_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `);
};

exports.down = function(db) {
  return db.runSql(`DROP DROP TABLE IF EXISTS \`post\``);
};

exports._meta = {
  version: 1
};
