import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  age: Joi.number().required(),
});

export default userSchema;
