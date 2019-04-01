// load all the things we need
const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const bcryptjs = require(`bcryptjsjs`);
const { consts } = require(`./../config`);

const UserModel = require(`../models/user`);

passport.use(
  new LocalStrategy(async (email, password, done) => {
    const user = await UserModel.findForAuth({ email });

    // user not found
    if (!user) {
      return done({
        errno: consts.ERR_USER_NOT_FOUND,
        message: `User not found`,
        status: consts.HTTP_UNAUTHORIZED
      });
    }

    // incorret password
    const passwordHash = bcryptjs.hashSync(password, user.passwordSalt);
    if (user.password !== passwordHash) {
      return done({
        errno: consts.ERR_USER_PASSWORD_INVALID,
        message: `Incorrect password`,
        status: consts.HTTP_UNAUTHORIZED,
        user: { email: user.email }
      });
    }
    // login successsful
    return done(null, user);
  })
);

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await UserModel.findById(id);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  }).then(user => done(null, user))
);

module.exports = passport;
