import Joi from '@hapi/joi';

export const getNearestPDVSchema = Joi.object({
  lat: Joi.number().required(),
  long: Joi.number().required(),
});
