const UserService = require('../services/user.service');


const getUser = async (req, res) => {
  const { userId } = req.params;

  const response = await UserService.getUser(userId)  
  return res.json(response);
};

const deleteUser = async (req, res) => {
  const { id,}  = req.params;
  

  const response = await UserService.deleteUser(id);

  return res.json(response);
};

module.exports = {
  deleteUser,
}




module.exports = {
  getUser,
  deleteUser
}