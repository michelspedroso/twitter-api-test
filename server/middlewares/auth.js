const { consts } = require(`./../config`);

const auth = {};

auth.isAuthenticated = () => (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(consts.HTTP_UNAUTHORIZED).json({
      errno: consts.ERR_USER_NOT_AUTHENTICATED,
      message: `Not authenticated`
    });
  }

  return next();
};

module.exports = auth;
