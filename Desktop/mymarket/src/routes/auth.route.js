const router = require('express').Router();
const AuthController = require('../controller/auth.controller');
const validator = require('../validators/authValidators')

router.post('/register', validator.validateRegister, AuthController.register);
router.post('/login',validator.validateLogin, AuthController.login);

module.exports = router;
