import * as Joi from 'joi';

export default Joi.object({
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  JWT_AT_SECRET: Joi.string().required(),
  JWT_AT_EXPIRES_IN: Joi.string().required(),
  JWT_RT_SECRET: Joi.string().required(),
  JWT_RT_EXPIRES_IN: Joi.string().required(),
  FILE_UPLOAD_DIR: Joi.string().required(),
});
