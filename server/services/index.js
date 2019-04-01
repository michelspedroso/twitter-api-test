const router = require(`express`).Router();

router.use(`/auth`, require(`./auth`));
router.use(`/user`, require(`./user`));
router.use(`/post`, require(`./post`));
router.use(`/comment`, require(`./comment`));
router.use(`/timeline`, require(`./timeline`));

module.exports = router;
