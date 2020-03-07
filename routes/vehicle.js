const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

// POST /vehicles
router.post('/', isLoggedIn, async (req, res, next) => {
  const { type } = req.body;
  const ownerId = req.session.currentUser._id;

  try {
    const vehicle = await Vehicle.create({ type, ownerId });

    const user = await User.findById(ownerId);
    if (!user) return next(createError(error));

    user.vehicles.push(vehicle._id);

    const updatedUser = await User.findByIdAndUpdate({_id: user._id}, {vehicles: user.vehicles, owner: true}, {new: true}).populate('vehicles');

    updatedUser.password = "*";
    req.session.currentUser = updatedUser;

    res
      .status(201)
      .json(vehicle);
  } catch (error) {
    next(createError(error));
  }
});

// PUT /vehicles/:vehicleId
router.put('/:vehicleId', isLoggedIn, async (req, res, next) => {
  const { vehicleId } = req.params;
  const { latitude, longitude, available } = req.body;

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if(!vehicle) return next(createError(404));
    else {
      const vehicleUpdated = await Vehicle.findByIdAndUpdate({_id: vehicle._id}, {latitude, longitude, available}, {new: true});

      res
        .status(201)
        .json(vehicleUpdated);
    }
  } catch (error) {
    next(createError(error));
  }
})

// DELETE /vehicles/:vehicleId
router.delete('/:vehicleId', isLoggedIn, async (req, res, next) => {
  const { vehicleId } = req.params;
  const userId = req.session.currentUser._id

  try {
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) return next(createError(404));
    else {
      const user = await User.findById(userId);

      user.vehicles.splice(user.vehicles.indexOf(vehicle._id), 1);

      if (user.vehicles.length === 0) user.owner = false;

      const updatedUser = await User.findByIdAndUpdate({_id: user._id}, {vehicles: user.vehicles, owner: user.owner}, {new: true}).populate('vehicles');

      await Vehicle.findByIdAndDelete(vehicleId);

      updatedUser.password = "*";
      req.session.currentUser = updatedUser;

      res
        .status(200)
        .send();
    }
  } catch (error) {
    next(createError(error));
  }
})

// GET /vehicles
router.get('/:vehicleId', isLoggedIn, async (req, res, next) => {
  const { vehicleId } = req.params;

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return next(createError(404));
    else {
      res
        .status(200)
        .json(vehicle);
    }
  } catch (error) {
    next(createError(error));
  }
})

// GET /vehicles
router.get('/', isLoggedIn, async (req, res, next) => {

  try {
    const userId = req.session.currentUser._id;

    const userVehicles = await Vehicle.find({ownerId: userId});
    res
      .status(200)
      .json(userVehicles);
  } catch (error) {
    next(createError(error));
  }
});

module.exports = router;
