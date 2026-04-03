const Joi = require('joi');

exports.recordSchema = Joi.object({
  amount: Joi.number().required(),

  type: Joi.string()
    .valid('income', 'expense')
    .required(),

  category: Joi.string().min(2).required(),

  notes: Joi.string().allow('').optional()
});


exports.updateSchema = Joi.object({
  amount: Joi.number().positive(),
  type: Joi.string().valid('income', 'expense'),
  category: Joi.string().min(2),
  date: Joi.date(),
  notes: Joi.string().allow('')
}).min(1);