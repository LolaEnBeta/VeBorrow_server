const Vehicle = require("../models/Vehicle");

const getAllVehicles = async (userId) => {
  const userVehicles = await Vehicle.find({ownerId: userId});

  return userVehicles;
}

const getVehicleById = async (vehicleId) => {
  const vehicle = await Vehicle.findById(vehicleId).populate("ownerId");
  return vehicle;
}

const getAllVehiclesAvailables = async () => {
  const useravailableVehicles = await Vehicle.find({available: true});
  return useravailableVehicles;
}

const updateVehicle = async (vehicleId, latitude, longitude, available) => {
  const vehicleUpdated = await Vehicle.findByIdAndUpdate({_id: vehicleId}, {latitude, longitude, available}, {new: true});
  return vehicleUpdated;
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  getAllVehiclesAvailables,
  updateVehicle
};
