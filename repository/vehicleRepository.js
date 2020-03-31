const Vehicle = require("../models/Vehicle");

const getUserVehicles = async (userId) => {
  const userVehicles = await Vehicle.find({ownerId: userId});
  return userVehicles;
}

const getOneVehicle = async (vehicleId) => {
  const vehicle = await Vehicle.findById(vehicleId).populate("ownerId");
  return vehicle;
}

const getAllTheAvailables = async () => {
  const availableVehicles = await Vehicle.find({available: true});
  return availableVehicles;
}

module.exports = {
  getUserVehicles,
  getOneVehicle,
  getAllTheAvailables,
}
