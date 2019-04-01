const router = require(`express`).Router();
const validate = require(`./../../utils/validate`);
const authMiddleware = require(`./../../middlewares/auth`);
const schema = require(`./schema`);

router.get(
  `/`,
  authMiddleware.isAuthenticated(),
  validate(schema.list),
  require(`./list`)
);

module.exports = router;
