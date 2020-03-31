const User = require("../models/User");

const getUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
}

module.exports = {
  getUser,
}
