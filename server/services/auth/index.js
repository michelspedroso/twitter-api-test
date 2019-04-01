const router = require(`express`).Router();

const passport = require(`./../../utils/passport`);
const authMiddleware = require(`./../../middlewares/auth`);

router.post(`/login`, passport.authenticate(`local`), (req, res) =>
  res.json(req.user)
);

router.get(`/logout`, (req, res) => {
  if (req.session) req.session.destroy();
  req.logout();
  return res.send();
});

router.get(`/me`, authMiddleware.isAuthenticated(), (req, res) =>
  res.send(req.user)
);

module.exports = router;
