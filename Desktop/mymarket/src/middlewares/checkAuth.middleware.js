const jwt = require('jsonwebtoken');
const { UnauthorizedException } = require('../tools');

const checkAuth = (req, res, next) => {
  try {
    if (req.headers.hasOwnProperty('authorization')) {
      const token = req?.headers?.authorization.split(' ')[1];
      
      const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

      // user -> userId, userTypeId
      req.user = {
        userId: user.userId,
        isAdmin: user.userTypeId === 1,
      };

      return next();
    } else {
      throw new Error()
    }
  } catch (e) {
    return next(new UnauthorizedException('please sign in'))
  }
};

module.exports = checkAuth