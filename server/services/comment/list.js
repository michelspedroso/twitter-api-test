const CommentModel = require(`../../models/comment`);
const paginate = require(`./../../utils/paginate`);

const list = async (req, res) => {
  try {
    CommentModel.executeTransaction(async connection => {
      try {
        const [{ total }] = await CommentModel.count(connection);
        const comments = await CommentModel.list(req.query, connection);
        const response = paginate(total, comments, req.query);
        return res.status(200).json(response);
      } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(502).json(err.message);
  }
};

module.exports = list;
