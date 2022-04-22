const Joi = require('@hapi/joi');

const favsSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    link: Joi.string().required(),
})

const schema = Joi.object({
    owner: Joi.string().required(),
    name: Joi.string().required(),
    favs: favsSchema,
})

module.exports = schema;