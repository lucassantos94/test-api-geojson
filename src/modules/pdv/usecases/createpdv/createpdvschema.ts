import Joi from '@hapi/joi';

export const createPDVSchema = Joi.object({
  tradingName: Joi.string().required(),
  ownerName: Joi.string().required(),
  document: Joi.string().required(),
  coverageArea: Joi.object({
    type: Joi.string()
      .pattern(/MultiPolygon/)
      .required(),
    coordinates: Joi.array()
      .items(Joi.array().items(Joi.array().items(Joi.array().items(Joi.number(), Joi.number()).length(2))))
      .required(),
  }).required(),
  address: Joi.object({
    type: Joi.string().pattern(/Point/).required(),
    coordinates: Joi.array().items(Joi.number(), Joi.number()).length(2).required(),
  }).required(),
}).required();
