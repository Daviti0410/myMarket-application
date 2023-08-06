const Joi = require("joi");
const { joiValidator } = require("../tools");

const paramsIdValidator = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().min(1).required()
  });

  return joiValidator({ schema, next, objectToValidate: req.params })
}


module.exports = paramsIdValidator;