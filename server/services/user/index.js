const router = require(`express`).Router();
const validate = require(`./../../utils/validate`);
const authMiddleware = require(`./../../middlewares/auth`);
const schema = require(`./schema`);

router.get(`/me`, authMiddleware.isAuthenticated(), require(`./get`));

router.get(
  `/`,
  authMiddleware.isAuthenticated(),
  validate(schema.list),
  require(`./list`)
);

router.post(`/`, validate(schema.create), require(`./create`));

router.post(
  `/me`,
  authMiddleware.isAuthenticated(),
  validate(schema.update),
  require(`./update`)
);

router.delete(`/me`, authMiddleware.isAuthenticated(), require(`./delete`));

module.exports = router;
