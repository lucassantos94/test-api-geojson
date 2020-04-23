import Joi from '@hapi/joi';

export const getPDVByIDSchema = Joi.string().uuid().required();
