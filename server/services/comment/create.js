const CommentModel = require(`../../models/comment`);

const create = async (req, res) => {
  try {
    const { text } = req.body;
    const user_id = req.user.id;
    const { post_id } = req.params;

    const { insertId } = await CommentModel.create({ text, user_id, post_id });
    return res.status(200).json({ id: insertId });
  } catch (err) {
    console.error(err);
    return res.status(502).json(err.message);
  }
};

module.exports = create;
