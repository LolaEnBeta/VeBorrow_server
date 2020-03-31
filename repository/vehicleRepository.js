const Vehicle = require("../models/Vehicle");

const getUserVehicles = async (userId) => {
  const userVehicles = await Vehicle.find({ownerId: userId});
  return userVehicles;
}

module.exports = {
  getUserVehicles,
}
