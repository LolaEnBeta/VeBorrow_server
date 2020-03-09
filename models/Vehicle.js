const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  type: {type: String, required: true, enum: ["bike", "motorcycle", "car", "scooter", "electric scooter"]},
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  latitude: {type: String, default: null},
  longitude: {type: String, default: null},
  available: {type: Boolean, default: false},
  inUse: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
