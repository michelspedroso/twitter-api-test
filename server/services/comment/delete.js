const CommentModel = require(`../../models/comment`);

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

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

        await CommentModel.deleteById(id, connection);

        return res.status(200).json();
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

module.exports = deletePost;
