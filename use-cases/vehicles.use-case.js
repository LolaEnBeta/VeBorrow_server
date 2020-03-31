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
  createOneVehicle,
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
  const vehicle = await createOneVehicle(type, ownerId);

  const user = await getUser(ownerId);

  user.vehicles.push(vehicle._id);
  user.owner = true;

  await updateUserVehicles(user);

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
