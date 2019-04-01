const PostModel = require(`../../models/post`);

const create = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.user;

    const { insertId } = await PostModel.create({ text, user_id: id });
    return res.status(200).json({ id: insertId });
  } catch (err) {
    console.error(err);
    return res.status(502).json(err.message);
  }
};

module.exports = create;
