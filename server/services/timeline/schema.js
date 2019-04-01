const Joi = require(`joi`);

const schema = {};

schema.list = Joi.object().keys({
  query: Joi.object()
    .keys({
      limit: Joi.number()
        .min(0)
        .default(15),
      offset: Joi.number()
        .min(0)
        .default(0),
      search: Joi.string().optional(),
      sortBy: Joi.object().optional()
    })
    .optional()
});

module.exports = schema;
