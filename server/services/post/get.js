const PostModel = require(`../../models/post`);
const CommentModel = require(`../../models/comment`);

const get = async (req, res) => {
  try {
    const post_id = req.params.id;
    const user_id = req.user.id;

    const [post] = await PostModel.findByIdAndUserId(post_id, user_id);
    if (!post) return res.status(404).json({ message: `Post not found` });
    post.comments = await CommentModel.findByPostIdAndUserId(post_id, user_id);
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(502).json(err.message);
  }
};

module.exports = get;
