const router = require ('express').Router();

const ProductController = require('../controller/product.controller')

router.get('/:userId', ProductController.getProduct);
router.delete('/:id/:userId', ProductController.deleteProduct);
router.post('./create/:userId', ProductController.createProduct);
module.exports = router;