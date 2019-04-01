const PostModel = require(`../../models/post`);

const update = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  const { text } = req.body;

  try {
    PostModel.executeTransaction(async connection => {
      try {
        const [post] = await PostModel.findByIdAndUserId(
          id,
          user_id,
          connection
        );

        if (!post) {
          return res.status(404).json({ message: `Post not found` });
        }

        await PostModel.update(id, { text, user_id }, connection);
        return res.status(200).json({ message: `Post updated` });
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
