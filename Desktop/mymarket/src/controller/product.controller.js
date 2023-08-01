const ProductService = require('../services/product.service')

const getProduct = async (req, res) => {
  const { userId } = req.params;

  const response = await ProductService.getProduct(userId);
    
  return res.json(response);
};

const deleteProduct = async (req, res) => {
  const { id }  = req.params;
  const { userId, isAdmin } = req.user;

  const response = await ProductService.deleteProduct(id, {  userId, isAdmin });

  return res.json(response);
};

const createProduct = async (req, res) => {
  const { payload } = req.params;

  const response = await ProductService.createProduct(payload);
  return res.json(response);
}

module.exports = {
  getProduct,
  deleteProduct,
  createProduct,
}