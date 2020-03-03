const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  ownerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  renterId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  vehicleId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle"}],
  message: {type: String}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
