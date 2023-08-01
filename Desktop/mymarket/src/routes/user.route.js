const router = require ('express').Router();

const UserController = require('../controller/user.controller')


router.get('/:userId', UserController.getUser);
router.delete('/:usersId', UserController.deleteUser);



module.exports = router;