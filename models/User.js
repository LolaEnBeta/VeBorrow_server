const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phoneNumber: {type: Number, required: true, unique: true},
  password: {type: String, required: true},
  owner: {type: Boolean,default: false},
  vehicles: [{type: Schema.Types.ObjectId, ref: "Vehicle"}],
  borrowList: [{type: Schema.Types.ObjectId, ref: "Borrow"}],
  subscription: {type: Object}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
