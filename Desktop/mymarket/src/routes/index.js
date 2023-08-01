const router = require('express').Router();

const ProductRoute = require('./product.route');
const UserRoute = require(`./user.route`);
const AuthRoute = require('./auth.route');

const CheckAuthMiddleware = require('../middlewares/checkAuth.middleware');

router.use('/auth', AuthRoute);

router.use(CheckAuthMiddleware);

router.use('/user', UserRoute);
router.use('/products', ProductRoute);



module.exports = router;