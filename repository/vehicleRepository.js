const VehicleMongoose = require("../models/Vehicle");
const Vehicle = require("../domain/Vehicle");

class VehicleRepository {
  async getUserVehicles(userId) {
    const userVehicles = await VehicleMongoose.find({ ownerId: userId });

    const vehicles = userVehicles.map(
      vehicle =>
        new Vehicle(
          vehicle._id,
          vehicle.type,
          vehicle.ownerId,
          vehicle.latitude,
          vehicle.longitude,
          vehicle.available,
          vehicle.inUse
        )
    );

    return vehicles;
  }

  async getOneVehicle(vehicleId) {
    const mongooseVehicle = await VehicleMongoose.findById(vehicleId).populate(
      "ownerId"
    );

    const vehicle = new Vehicle(
      mongooseVehicle._id,
      mongooseVehicle.type,
      mongooseVehicle.ownerId,
      mongooseVehicle.latitude,
      mongooseVehicle.longitude,
      mongooseVehicle.available,
      mongooseVehicle.inUse
    );

    return vehicle;
  }

  async getAllTheAvailables() {
    const availableVehicles = await VehicleMongoose.find({ available: true });
    const vehicles = availableVehicles.map(
      vehicle =>
        new Vehicle(
          vehicle._id,
          vehicle.type,
          vehicle.ownerId,
          vehicle.latitude,
          vehicle.longitude,
          vehicle.available,
          vehicle.inUse
        )
    );
    return vehicles;
  }

  async deleteOneVehicle(vehicleId) {
    const deletedVehicle = await VehicleMongoose.findByIdAndDelete(vehicleId);
    const vehicle = new Vehicle(
      deletedVehicle._id,
      deletedVehicle.type,
      deletedVehicle.ownerId,
      deletedVehicle.latitude,
      deletedVehicle.longitude,
      deletedVehicle.available,
      deletedVehicle.inUse
    );
    return vehicle;
  }

  async createOneVehicle(type, ownerId) {
    const mongooseVehicle = await VehicleMongoose.create({ type, ownerId });
    const vehicle = new Vehicle(
      mongooseVehicle._id,
      mongooseVehicle.type,
      mongooseVehicle.ownerId,
      mongooseVehicle.latitude,
      mongooseVehicle.longitude,
      mongooseVehicle.available,
      mongooseVehicle.inUse
    );
    return vehicle;
  }

  async updateOneVehicle(vehicle) {
    await VehicleMongoose.findByIdAndUpdate(
      { _id: vehicle._id },
      {
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
        available: vehicle.available
      },
      { new: true }
    );
  }
}

module.exports = new VehicleRepository();
