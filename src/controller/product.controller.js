const ProductService = require('../services/product.service');
const { safeControllerWrapper } = require('../tools');

const getProduct = safeControllerWrapper (async (req, res) => {
  const { userId } = req.params;

  const response = await ProductService.getProduct(userId);
    
  return res.json(response);
});

const deleteProduct = safeControllerWrapper( async (req, res) => {
  const { id }  = req.params;
  const { userId, isAdmin } = req.user;

  const response = await ProductService.deleteProduct(id, {  userId, isAdmin });

  return res.json(response);
});

const createProduct = safeControllerWrapper (async (req, res) => {
  const { id, payload } = req.params;

  const response = await ProductService.createProduct(payload , id, {  userId });

  return res.json(response);
});

const buyProduct = safeControllerWrapper (async (req, res) =>{
  const { id } = req.params;
  const { userId } = req.user;
  
    const response = await ProductService.buyProduct(id, {userId} );
  
    return res.json(response);
  
  })

module.exports = {
  getProduct,
  deleteProduct,
  createProduct,
  buyProduct
}