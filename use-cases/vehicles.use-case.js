const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

const {
  getUser,
  updateUserVehicles,
} = require("../repository/userRepository");

const {
  getUserVehicles,
  getOneVehicle,
  getAllTheAvailables,
  deleteOneVehicle,
} = require("../repository/vehicleRepository");

const getAllVehicles = async (userId) => {
  const userVehicles = await getUserVehicles(userId);

  return userVehicles;
}

const getVehicleById = async (vehicleId) => {
  const vehicle = await getOneVehicle(vehicleId);
  return vehicle;
}

const getAllVehiclesAvailables = async () => {
  const useravailableVehicles = await getAllTheAvailables();
  return useravailableVehicles;
}

const updateVehicle = async (vehicleId, latitude, longitude, available) => {
  const vehicleUpdated = await Vehicle.findByIdAndUpdate({_id: vehicleId}, {latitude, longitude, available}, {new: true});
  return vehicleUpdated;
}

const deleteVehicle = async (vehicleId, userId) => {
  const user = await getUser(userId);

  const vehicleIndex = user.vehicles.indexOf(vehicleId);

  user.vehicles.splice(vehicleIndex, 1);

  if (user.vehicles.length === 0) user.owner = false;

  await updateUserVehicles(user);

  const deletedVehicle = await deleteOneVehicle(vehicleId);

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
