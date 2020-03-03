const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");


router.post('/', isLoggedIn, async (req, res, next) => {
  const { type } = req.body;
  const ownerId = req.session.currentUser._id;

  try {
    const vehicle = await Vehicle.create({ type, ownerId });

    const user = await User.findById(ownerId);

    user.vehicles.push(vehicle._id);

    const updatedUser = await User.findByIdAndUpdate({_id: user._id}, {vehicles: user.vehicles, owner: true}, {new: true});

    updatedUser.password = "*";
    req.session.currentUser = updatedUser;

    res
      .status(201)
      .json(vehicle);
  } catch (error) {
    next(createError(error));
  }
});

module.exports = router;
