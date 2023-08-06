const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');
const { safeControllerWrapper } = require('../tools')


const register = safeControllerWrapper(async (req, res) => {
  const payload = req.body;

  await UserService.createUser(payload);

  return res.json({ message: 'CREATED' });
})

const login = safeControllerWrapper(async (req, res) => {
  const payload = req.body;

  const token = await AuthService.login(payload);

  return res.json({ token })
});


module.exports = {
  register,
  login,
}