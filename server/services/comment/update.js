const CommentModel = require(`../../models/comment`);

const update = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  const { text } = req.body;

  try {
    CommentModel.executeTransaction(async connection => {
      try {
        const [comment] = await CommentModel.findByIdAndUserId(
          id,
          user_id,
          connection
        );

        if (!comment) {
          return res.status(404).json({ message: `Comment not found` });
        }

        await CommentModel.update(id, { text }, connection);
        return res.status(200).json({ message: `Comment updated` });
      } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
      }
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = update;
