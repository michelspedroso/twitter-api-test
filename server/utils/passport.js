const passport = require(`passport`);
const bcryptjs = require(`bcryptjs`);
const LocalStrategy = require(`passport-local`).Strategy;
const UserModel = require(`./../models/user`);

const strategy = new LocalStrategy(
  { usernameField: `email`, passwordField: `password` },
  async (email, password, done) => {
    let user;
    try {
      user = await UserModel.findOneByEmail(email);
      if (!user) {
        return done(null, false, { message: `No user by that email` });
      }
      const passwordHash = bcryptjs.hashSync(password, user.passwordSalt);
      const match = await UserModel.findOneByAuth({
        email,
        password: passwordHash
      });
      if (match) return done(null, user);
      return done(null, false, { message: `Password wrong` });
    } catch (e) {
      return done(e);
    }
  }
);

// eslint-disable-next-line func-names
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await UserModel.findOneByEmail(email);
    if (!user) {
      return done(new Error(`User not found`));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});

module.exports = passport;
