const router = require('express').Router();

const ProductRoute = require('./product.route');
const UserRoute = require(`./user.route`);
const AuthRoute = require('./auth.route');
const StatisticRoute = require ('./statistic.route');
const CheckAuthMiddleware = require('../middlewares/checkAuth.middleware');


router.use('/auth', AuthRoute);
router.use('/statistic', StatisticRoute);

router.use(CheckAuthMiddleware);

router.use('/user', UserRoute);
router.use('/products', ProductRoute);



module.exports = router;