const UserModel = require(`../../models/user`);

const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;

    UserModel.executeTransaction(async connection => {
      try {
        const [user] = await UserModel.findById(id, connection);
        if (!user) {
          return res.status(404).json({ message: `User not found` });
        }

        await UserModel.deleteById(user.id, connection);

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

module.exports = deleteUser;
