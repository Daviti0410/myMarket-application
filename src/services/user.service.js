const bcrypt = require('bcrypt');
const { User: UserModel, Product } = require('../db/models');
const { ConflictException, NotFoundException } = require('../tools');

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



const deleteUser = async (id, authUser) => {

  const user = await UserModel.findByPk(id);

  if (!user) throw new NotFoundException('Not Found');

  if(Product.userId !== authUser.userId || !authUser.isAdmin) throw new UnauthorizedException('Unauthorized');


  
  await UserModel.destroy(id);
};  



module.exports = {
  getUser,
  createUser,
  findByEmail,
  deleteUser,
}