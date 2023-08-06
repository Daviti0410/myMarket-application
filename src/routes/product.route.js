const router = require ('express').Router();
const ProductController = require('../controller/product.controller');
const paramsIdValidator = require('../validators/paramsId.validator');

router.get('/:userId', ProductController.getProduct);
router.delete('/:id', paramsIdValidator, ProductController.deleteProduct);
router.post('/create/:userId', ProductController.createProduct);
router.put('/buy/:id', ProductController.buyProduct);



module.exports = router;