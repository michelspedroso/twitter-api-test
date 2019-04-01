const Model = require(`../utils/model`);

class User extends Model {
  constructor() {
    super(`user`);
  }

  async list(options, connection = null) {
    const params = [];
    let sql = `SELECT u.name, u.email, u.created, u.updated FROM user u`;

    if (options.sortBy) {
      sql += ` ORDER BY ${options.sortBy.column} ${options.sortBy.order}`;
    } else {
      sql += ` ORDER BY u.created DESC`;
    }

    sql += ` LIMIT ? OFFSET ?`;
    params.push(options.limit);
    params.push(options.offset);

    return this.query(sql, params, connection);
  }

  async findOneByAuth({ email, password }, connection = null) {
    const params = [email, password];
    const sql = `SELECT u.name, u.id, u.email, u.created, u.updated, passwordSalt 
                FROM user u WHERE u.email = ? AND u.password = ? LIMIT 1`;

    const [result] = await this.query(sql, params, connection);

    return result;
  }

  async findOneByEmail(email, connection = null) {
    const params = [email];
    const sql = `SELECT u.name, u.id, u.email, u.created, u.updated, passwordSalt 
    FROM user u WHERE u.email = ? LIMIT 1`;

    const [result] = await this.query(sql, params, connection);
    return result;
  }
}

module.exports = new User();
