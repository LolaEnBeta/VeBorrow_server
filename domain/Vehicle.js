class Vehicle {
  constructor(id, type, ownerId, latitude, longitude, available, inUse) {
    this._id = id;
    this.type = type;
    this.ownerId = ownerId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.available = available;
    this.inUse = inUse;
  }
}

module.exports = Vehicle;
