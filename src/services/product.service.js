const uuid = require('uuid');

const { Product,  User: UserModel, ProductType, Transaction} = require("../db/models");
const { NotFoundException, UnauthorizedException, BadRequestException } = require('../tools');



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

  if(product.userId !== authUser.userId) throw new UnauthorizedException('Unauthorized');

  await Product.destroy(id);
};



const createProduct = async ({payload}, authUser) => {

  const user = await UserModel.findOne({where: {id: payload.userId }});

  const newProduct = await Product.create({payload})

  if (newProduct) {
    return {
      message: 'This product already exists'
    }
  };


  if ( user != authUser.userId ) throw new UnauthorizedException('Unauthorized');
  

   
  return newProduct
};


const buyProduct = async (id, authUser) => {
   
  const product = Product.findByPk(id);

  if (!product) throw new NotFoundException('Product Not Found');

  const buyerId = UserModel.findOne({
    where:{
      id: authUser.userId,
      userType: 2
    }
  });


  const user = UserModel.findOne({
    where: {
      id: Product.userId
    }
  }); 

  if(!buyerId) throw new NotFoundException('User Not Found');

  
  if (buyerId.balance < product.price) throw new BadRequestException('Insufficient balance');
 
   const transaction = {
    uid: uuid.v4(),
    buyerId,
    id,
    amount: product.price,
    date: new Date().toISOString(),
   };

   buyerId.balance -= product.price;
   user.balance += product.price;

   await buyerId.save({fields: balance});
   await user.save({fields: balance});


   return Transaction.create(transaction);
}


module.exports = {
  getProduct,
  deleteProduct,
  createProduct,
  buyProduct
}