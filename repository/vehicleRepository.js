const Vehicle = require("../models/Vehicle");

class VehicleRepository {
  async getUserVehicles(userId) {
    const userVehicles = await Vehicle.find({ownerId: userId});
    return userVehicles;
  }

  async getOneVehicle(vehicleId) {
    const vehicle = await Vehicle.findById(vehicleId).populate("ownerId");
    return vehicle;
  }

  async getAllTheAvailables() {
    const availableVehicles = await Vehicle.find({available: true});
    return availableVehicles;
  }

  async deleteOneVehicle(vehicleId) {
    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);
    return deletedVehicle;
  }

  async createOneVehicle(type, ownerId) {
    const vehicle = await Vehicle.create({ type, ownerId });
    return vehicle;
  }

  async updateOneVehicle(vehicle) {
    const vehicleUpdated = await Vehicle.findByIdAndUpdate({_id: vehicle._id},
      {
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
        available: vehicle.available
      }, {new: true});
    return vehicleUpdated;
  }
}


module.exports = new VehicleRepository();
