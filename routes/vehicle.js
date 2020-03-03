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

// POST /vehicles
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

// PUT /vehicle/:vehicleId
router.put('/:vehicleId', isLoggedIn, async (req, res, next) => {
  const { vehicleId } = req.params;
  const { latitude, longitude, available } = req.body;

  try {
    const vehicleUpdated = await Vehicle.findByIdAndUpdate({_id: vehicleId}, {latitude, longitude, available}, {new: true});

    res
      .status(201)
      .json(vehicleUpdated);
  } catch (error) {
    next(createError(error));
  }
})

// DELETE /vehicle/:vehicleId
router.delete('/:vehicleId', isLoggedIn, async (req, res, next) => {
  const { vehicleId } = req.params;

  try {
    await Vehicle.findByIdAndDelete(vehicleId);

    res
      .status(200)
      .send();
  } catch (error) {
    next(createError(error));
  }
})

// GET /vehicles
router.get('/:vehicleId', isLoggedIn, async (req, res, next) => {
  const { vehicleId } = req.params;

  try {
    const vehicle = await Vehicle.findById(vehicleId);

    res
      .status(200)
      .json(vehicle);
  } catch (error) {
    next(createError(error));
  }
})

// GET /vehicles
router.get('/', isLoggedIn, async (req, res, next) => {

  try {
    const vehiclesList = await Vehicle.find();

    res
      .status(200)
      .json(vehiclesList);
  } catch (error) {
    next(createError(error));
  }
});

module.exports = router;
