const Model = require(`../utils/model`);

class Comment extends Model {
  constructor() {
    super(`comment`);
  }

  async findByPostId(post_id, connection = null) {
    const params = [post_id];
    const sql = `SELECT c.* FROM comment c WHERE c.post_id = ? ORDER BY c.created DESC`;

    return this.query(sql, params, connection);
  }

  async findByPostIdAndUserId(post_id, user_id, connection = null) {
    const params = [post_id, user_id];
    const sql = `SELECT c.* FROM comment c WHERE c.post_id = ? AND c.user_id = ? ORDER BY c.created DESC`;

    return this.query(sql, params, connection);
  }

  async findByIdAndUserId(id, user_id, connection = null) {
    const params = [id, user_id];
    const sql = `SELECT c.* FROM comment c WHERE c.id = ? AND c.user_id = ? ORDER BY c.created DESC`;

    return this.query(sql, params, connection);
  }

  async list(options, connection = null) {
    const params = [];
    let sql = `SELECT c.text, u.name AS userName, u.email AS userEmail, p.text AS postText, c.created, c.updated FROM comment c JOIN user u ON u.id = c.user_id JOIN post p ON p.id = c.post_id WHERE 1=1`;

    if (options.user_id) {
      sql += ` AND c.user_id = ?`;
      params.push(options.user_id);
    }

    if (options.post_id) {
      sql += ` AND c.post_id = ?`;
      params.push(options.post_id);
    }

    if (options.sortBy) {
      sql += ` ORDER BY ${options.sortBy.column} ${options.sortBy.order}`;
    } else {
      sql += ` ORDER BY c.created DESC`;
    }

    sql += ` LIMIT ? OFFSET ?`;
    params.push(options.limit);
    params.push(options.offset);

    return this.query(sql, params, connection);
  }
}

module.exports = new Comment();
