const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  renterId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle"},
  message: {type: String},
  accepted: {type: Boolean, default: false},
  rejected: {type: Boolean, default: false},
  completed: {type: Boolean, default: false},

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
