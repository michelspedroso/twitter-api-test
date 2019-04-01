const router = require(`express`).Router();
const validate = require(`./../../utils/validate`);
const authMiddleware = require(`./../../middlewares/auth`);
const schema = require(`./schema`);

router.get(`/:id`, authMiddleware.isAuthenticated(), require(`./get`));

router.get(
  `/`,
  authMiddleware.isAuthenticated(),
  validate(schema.list),
  require(`./list`)
);

router.post(
  `/:post_id`,
  authMiddleware.isAuthenticated(),
  validate(schema.create),
  require(`./create`)
);

router.patch(
  `/:id`,
  authMiddleware.isAuthenticated(),
  validate(schema.update),
  require(`./update`)
);

router.delete(`/:id`, authMiddleware.isAuthenticated(), require(`./delete`));

module.exports = router;
