const bcryptjs = require(`bcryptjs`);

const { env } = require(`../../config`);
const UserModel = require(`../../models/user`);

const create = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await UserModel.findOneByEmail(email);

    if (user) {
      return res.status(409).json({ message: `Email unavailable` });
    }

    const passwordSalt = bcryptjs.genSaltSync(env.security.cryptjslength);
    const fields = {
      name: name,
      email: email,
      password: bcryptjs.hashSync(req.body.password, passwordSalt),
      passwordSalt
    };

    const { insertId } = await UserModel.create(fields);
    return res.status(200).json({ id: insertId });
  } catch (err) {
    console.error(err);
    if (err.errno === 1062)
      return res.status(409).json({ message: err.message });
    return res.status(502).json(err.message);
  }
};

module.exports = create;
