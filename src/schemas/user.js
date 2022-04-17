const Joi = require('@hapi/joi');

const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = schema;