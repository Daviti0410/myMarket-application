const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserService = require('./user.service');
const { UnauthorizedException, NotFoundException } = require('../tools');

const login = async (payload) => {
  const user = await UserService.findByEmail(payload.email);

  if(!user) throw new NotFoundException('email not found');

  const match = await bcrypt.compare(payload.password, user.password);

  if (!match) throw new UnauthorizedException('email/password is incorrect');

  const jwtToken = jwt.sign({
    userId: user.id,
    userTypeId: user.userTypeId
  },
    process.env.JWT_SECRET,
    {
      expiresIn: `${process.env.JWT_VALIDITY_HOURS}h`
    }
  )

  return jwtToken;
};

module.exports = {
  login,
}