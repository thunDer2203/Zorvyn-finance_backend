const Joi = require('joi');

exports.userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('viewer','analyst','admin'),
  active: Joi.number().valid(0, 1)
});


exports.updateUserSchema = Joi.object({
  username: Joi.string().min(3),
  password: Joi.string().min(6),
  role: Joi.string().valid('viewer', 'analyst', 'admin'),
  active: Joi.number().valid(0, 1)
}).min(1); // at least one field (for updates)