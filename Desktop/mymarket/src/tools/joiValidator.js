const { BadRequestException } = require('./errors')

module.exports = async ({ schema, objectToValidate, next }) => {
  try {
    await schema.validateAsync(objectToValidate);
    return next();
  } catch (e) {
    return next(new BadRequestException(e.details[0].message))
  }
}