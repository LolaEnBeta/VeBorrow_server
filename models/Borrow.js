const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  renterId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle"},
  message: {type: String}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
