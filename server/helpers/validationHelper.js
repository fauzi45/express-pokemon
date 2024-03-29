const Joi = require("joi");
const Boom = require("boom");

const detailPokemonValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};
const catchPokemonValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const releasePokemonValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const renamePokemonValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    nickname: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  detailPokemonValidation,
  catchPokemonValidation,
  renamePokemonValidation,
  releasePokemonValidation,
};
