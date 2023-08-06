const UserService = require('../services/user.service');
const { safeControllerWrapper } = require('../tools');


const getUser = safeControllerWrapper (async (req, res) => {
  const { userId } = req.params;

  const response = await UserService.getUser(userId)  
  return res.json(response);
});

const deleteUser = safeControllerWrapper (async (req, res) => {
  const { id }  = req.params;
  const { userId, isAdmin } = req.user;
  

  const response = await UserService.deleteUser(id, {  userId, isAdmin });

  return res.json(response);
});


module.exports = {
  getUser,
  deleteUser,
}