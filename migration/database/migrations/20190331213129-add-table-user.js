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
    DROP TABLE IF EXISTS \`user\`;
    CREATE TABLE \`user\` (
      \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
      \`name\` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
      \`email\` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
      \`password\` varchar(255) NOT NULL DEFAULT '',
      \`passwordSalt\` varchar(255) NOT NULL DEFAULT '',
      \`created\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updated\` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE KEY \`email\` (\`email\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `);
};

exports.down = function(db) {
  return db.runSql(`DROP DROP TABLE IF EXISTS \`user\``);
};

exports._meta = {
  version: 1
};
