const CommentModel = require(`../../models/comment`);

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const [comment] = await CommentModel.findByIdAndUserId(id, user_id);
    if (!comment) return res.status(404).json({ message: `Comment not found` });
    return res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    return res.status(502).json(err.message);
  }
};

module.exports = get;
