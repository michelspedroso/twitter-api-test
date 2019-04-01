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

schema.create = Joi.object().keys({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string()
        .min(1)
        .max(255)
        .required(),
      password: Joi.string()
        .min(4)
        .max(255)
        .required()
    })
    .required()
});

schema.update = Joi.object().keys({
  user: Joi.object().keys({
    id: Joi.number()
      .integer()
      .required()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string()
        .min(1)
        .max(255)
        .required(),
      password: Joi.string()
        .min(4)
        .max(255)
        .required()
    })
    .required()
});

module.exports = schema;
