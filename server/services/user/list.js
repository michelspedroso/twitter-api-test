const UserModel = require(`../../models/user`);
const paginate = require(`./../../utils/paginate`);

const list = async (req, res) => {
  try {
    UserModel.executeTransaction(async connection => {
      try {
        const [{ total }] = await UserModel.count(connection);
        const users = await UserModel.list(req.query, connection);
        const response = paginate(total, users, req.query);
        return res.status(200).json(response);
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

module.exports = list;
