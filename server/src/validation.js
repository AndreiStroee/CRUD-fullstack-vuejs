const Joi = require('joi');

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).trim().required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const adminValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).trim(),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6),
    roles: Joi.string().valid('admin', 'user', 'employee'),
    active: Joi.bool(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.adminValidation = adminValidation;
