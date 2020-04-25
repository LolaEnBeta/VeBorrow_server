const userRepository = require("../repository/userRepository");
const vehicleRepository = require("../repository/vehicleRepository");

class VehicleService {
  async getAllVehicles(userId) {
    const userVehicles = await vehicleRepository.getUserVehicles(userId);

    return userVehicles;
  }

  async getVehicleById(vehicleId) {
    const vehicle = await vehicleRepository.getOneVehicle(vehicleId);
    return vehicle;
  }

  async getAllVehiclesAvailables() {
    const useravailableVehicles = await vehicleRepository.getAllTheAvailables();
    return useravailableVehicles;
  }

  async updateVehicle(vehicleId, latitude, longitude, available) {
    const vehicle = await vehicleRepository.getOneVehicle(vehicleId);

    vehicle.latitude = latitude;
    vehicle.longitude = longitude;
    vehicle.available = available;

    await vehicleRepository.updateOneVehicle(vehicle);
    return vehicle;
  }

  async deleteVehicle(vehicleId, userId) {
    const user = await userRepository.getUser(userId);

    const vehicleIndex = user.vehicles.indexOf(vehicleId);

    user.vehicles.splice(vehicleIndex, 1);

    if (user.vehicles.length === 0) user.owner = false;

    await userRepository.updateUserVehicles(user);

    const deletedVehicle = await vehicleRepository.deleteOneVehicle(vehicleId);

    return deletedVehicle;
  }

  async createVehicle(type, ownerId) {
    const vehicle = await vehicleRepository.createOneVehicle(type, ownerId);

    const user = await userRepository.getUser(ownerId);

    user.vehicles.push(vehicle._id);
    user.owner = true;

    await userRepository.updateUserVehicles(user);

    return vehicle;
  }
}

module.exports = new VehicleService();
