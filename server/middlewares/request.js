const Joi = require(`joi`);

const schema = Joi.object().keys({
  query: Joi.object()
    .keys({
      limit: Joi.number()
        .integer()
        .min(0)
        .max(100)
        .default(15),
      offset: Joi.number()
        .integer()
        .min(0)
        .default(0)
    })
    .optional()
});

module.exports = (req, res, next) => {
  const result = Joi.validate({ query: req.query }, schema, {
    allowUnknown: true
  });

  if (result.error) {
    return res.status(400).json(result.error.details);
  }

  req.query = result.value.query;

  if (req.query.sortBy) {
    let [column, order] = req.query.sortBy.split(`,`);
    order = order.ToUpperCase();
    req.query.sortBy = {
      column: column,
      order: [`ASC`, `DESC`].includes(order) ? order : "DESC"
    };
  }

  return next();
};
