const Model = require(`../utils/model`);

class Post extends Model {
  constructor() {
    super(`post`);
  }

  async findByIdAndUserId(id, user_id, connection = null) {
    const params = [id, user_id];
    const sql = `SELECT p.*, u.name AS userName, p.user_id, u.email AS userEmail FROM post p JOIN user u ON u.id = p.user_id WHERE p.id = ? AND p.user_id = ? ORDER BY p.created DESC`;

    return this.query(sql, params, connection);
  }

  async list(options, connection = null) {
    const params = [];
    let sql = `SELECT p.id AS postId, p.text, u.name AS userName, u.email AS userEmail, p.created, p.updated FROM post p JOIN user u ON u.id = p.user_id WHERE 1=1`;

    if (options.user_id) {
      sql += ` AND p.user_id = ?`;
      params.push(options.user_id);
    }

    if (options.sortBy) {
      sql += ` ORDER BY ${options.sortBy.column} ${options.sortBy.order}`;
    } else {
      sql += ` ORDER BY p.created DESC`;
    }

    sql += ` LIMIT ? OFFSET ?`;
    params.push(options.limit);
    params.push(options.offset);

    return this.query(sql, params, connection);
  }
}

module.exports = new Post();
