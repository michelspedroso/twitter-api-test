const PostModel = require(`../../models/post`);

const paginate = require(`./../../utils/paginate`);

const list = async (req, res) => {
  try {
    PostModel.executeTransaction(async connection => {
      try {
        const [{ total }] = await PostModel.count(connection);
        let posts = await PostModel.list(req.query, connection);
        const response = paginate(total, posts, req.query);
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
