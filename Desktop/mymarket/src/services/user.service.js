const bcrypt = require('bcrypt');
const { User: UserModel } = require('../db/models');
const { ConflictException, NotFoundException, ForbiddenException } = require('../tools');

const getUser = async (userId) => {
  const data = await UserModel.findOne({
    where: {
      id: userId,
    }
  });


  return data;
};


const findByEmail = (email) => UserModel.findOne({ where: { email }});

const createUser = async (userPayload) => {
  const user = await UserModel.findOne({ 
    where: { 
      email: userPayload.email 
    } 
  });

  if(user) throw new ConflictException('User Already exist')

  const hashedPassword = bcrypt.hashSync(userPayload.password, Number(process.env.AUTH_SALT_AMOUNT));

  userPayload.password = hashedPassword;

  return UserModel.create(userPayload, {
    returning: true,
  });
};



const deleteUser = async (payload) => {
  
  const admin = await UserModel.findByPk(id);
  const user = await UserModel.findByPk(userId);

  if (admin.isAdmin != true) throw new ForbiddenException('invalid user')

  if (!user) throw new NotFoundException('Not Found');
  
  await UserModel.destroy(userId);
};  

module.exports = {
  deleteUser,
}

module.exports = {
  getUser,
  createUser,
  findByEmail,
  deleteUser
}