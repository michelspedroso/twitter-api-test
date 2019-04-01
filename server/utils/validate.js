const Joi = require(`joi`);

const validate = schema => (req, res, next) => {
  // prettier-ignore
  const result = Joi.validate({ query: req.query, body: req.body, params: req.params }, schema, { allowUnknown: true });

  if (result.error) {
    return res.status(400).json(result.error.details);
  }

  req.query = result.value.query;
  req.body = result.value.body;
  return next();
};

module.exports = validate;
