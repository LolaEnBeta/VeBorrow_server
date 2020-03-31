const User = require("../models/User");

const getUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
}

const updateUserVehicles = async (user) => {
  await User.findByIdAndUpdate({_id: user._id}, {vehicles: user.vehicles, owner: user.owner}, {new: true});
}

module.exports = {
  getUser,
  updateUserVehicles,
}
