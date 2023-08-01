const Joi = require("joi");
const { joiValidator } = require('../../tools')

const validateRegister = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    balance: Joi.number().min(0).required(),
    userType: Joi.number().required()
  });

  return joiValidator({ schema, objectToValidate: req.body, next })
}

const validateLogin = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
  });

  return joiValidator({ schema, objectToValidate: req.body, next })
}


module.exports = { validateRegister, validateLogin }