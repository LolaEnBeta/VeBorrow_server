const Vehicle = require("../models/Vehicle");

const getAllVehicles = async (userId) => {
  const userVehicles = await Vehicle.find({ownerId: userId});

  return userVehicles;
}

const getVehicleById = async (vehicleId) => {
  const vehicle = await Vehicle.findById(vehicleId).populate("ownerId");
  return vehicle;
}

module.exports = {getAllVehicles, getVehicleById};
