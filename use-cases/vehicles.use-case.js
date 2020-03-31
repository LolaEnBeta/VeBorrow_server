const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

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

const deleteVehicle = async (vehicleId, userId) => {
  const user = await User.findById(userId);

  const vehicleIndex = user.vehicles.indexOf(vehicleId);

  user.vehicles.splice(vehicleIndex, 1);

  if (user.vehicles.length === 0) user.owner = false;

  await User.findByIdAndUpdate({_id: user._id}, {vehicles: user.vehicles, owner: user.owner}, {new: true}).populate('vehicles');

  const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

  return deletedVehicle;
}

const createVehicle = async (type, ownerId) => {
  const vehicle = await Vehicle.create({ type, ownerId });

  const user = await User.findById(ownerId);
  user.vehicles.push(vehicle._id);

  await User.findByIdAndUpdate({_id: user._id}, {vehicles: user.vehicles, owner: true}, {new: true}).populate('vehicles');

  return vehicle;
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  getAllVehiclesAvailables,
  updateVehicle,
  deleteVehicle,
  createVehicle,
};
