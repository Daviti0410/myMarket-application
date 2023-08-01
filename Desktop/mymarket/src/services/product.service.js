const { Product,  User: UserModel, ProductType} = require("../db/models");
const { NotFoundException } = require('../tools');



const getProduct = async (userId) => {
  const data = await UserModel.findOne({
    where: {
       id:userId,
    },
    include: {
      model:  Product,
      as: 'products',
      required: false,

      include: {
        attributes: ['title'],
        model: ProductType,
        as: 'productTypes',
        required: true
      }
    }
  });

  return data;
};

const deleteProduct = async (id, authUser) => {
  const product = await Product.findByPk(id);

  if (!product) throw new NotFoundException('Not Found');

  if(product.userId !== authUser.userId || !authUser.isAdmin) throw new UnauthorizedException('Unauthorized');

  await Product.destroy(id);
};

const createProduct = async ({payload}) => {

  const user = await Product.findOne({where: {userId: payload.userId }})
 
  const newProduct = await Product.create({payload})

  if(newProduct) {
    return {
      message: 'This product already exists'
    }
  };

  if(!user) throw new NotFoundException('Invalid User');

  
  return newProduct
}


module.exports = {
  getProduct,
  deleteProduct,
  createProduct,
}