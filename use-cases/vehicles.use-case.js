const Vehicle = require("../models/Vehicle");

const getAllVehicles = async (userId) => {
  const userVehicles = await Vehicle.find({ownerId: userId});

  return userVehicles;
}

module.exports = getAllVehicles;
