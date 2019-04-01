const _ = require(`lodash`);
const UserModel = require(`../../models/user`);

const get = async (req, res) => {
  try {
    const { id } = req.user;
    const [user] = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: `User not found` });
    return res.status(200).json(_.omit(user, [`password`, `passwordSalt`]));
  } catch (err) {
    console.error(err);
    return res.status(502).json(err.message);
  }
};

module.exports = get;
