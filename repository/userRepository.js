const User = require("../models/User");

class UserRepository {

  async getUser(userId) {
    const user = await User.findById(userId);
    return user;
  }

  async updateUserVehicles(user) {
    await User.findByIdAndUpdate({_id: user._id}, {vehicles: user.vehicles, owner: user.owner}, {new: true});
  }
}

module.exports = new UserRepository();
