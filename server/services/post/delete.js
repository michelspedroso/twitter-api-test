const PostModel = require(`../../models/post`);

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

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

        await PostModel.deleteById(id, connection);

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
