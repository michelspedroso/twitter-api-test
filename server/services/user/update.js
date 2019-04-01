const bcryptjs = require(`bcryptjs`);

const UserModel = require(`../../models/user`);

const { env } = require(`../../config`);

const update = async (req, res) => {
  const { id } = req.user;
  const { name, email, password } = req.body;

  try {
    UserModel.executeTransaction(async connection => {
      try {
        const [user] = await UserModel.findById(id, connection);
        if (!user) {
          return res.status(404).json({ message: `User not found` });
        }

        const passwordSalt = bcryptjs.genSaltSync(env.security.cryptjslength);
        const fields = {
          name,
          email,
          password: bcryptjs.hashSync(password, passwordSalt),
          passwordSalt
        };

        await UserModel.update(user.id, fields, connection);
        return res.status(200).json({ message: `User updated` });
      } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
      }
    });
  } catch (err) {
    if (err.errno === 1062)
      return res.status(409).json({ message: err.message });
    return res.status(500).json(err.message);
  }
};

module.exports = update;
