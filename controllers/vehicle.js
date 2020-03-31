const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

const {
  getAllVehicles,
  getVehicleById,
  getAllVehiclesAvailables,
  updateVehicle,
  deleteVehicle,
  createVehicle,
} = require("../use-cases/vehicles.use-case");

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
    const newVehicle = await createVehicle(type, ownerId);

    res
      .status(201)
      .json(newVehicle);
  } catch (error) {
    next(createError(error));
  }
});

// PUT /vehicles/:vehicleId
router.put('/:vehicleId', isLoggedIn, async (req, res, next) => {
  const { vehicleId } = req.params;
  const { latitude, longitude, available } = req.body;

  try {
    const vehicleUpdated = await updateVehicle(vehicleId, latitude, longitude, available);
    res
      .status(201)
      .json(vehicleUpdated);
  } catch (error) {
    next(createError(error));
  }
})

// DELETE /vehicles/:vehicleId
router.delete('/:vehicleId', isLoggedIn, async (req, res, next) => {
  const { vehicleId } = req.params;
  const userId = req.session.currentUser._id

  try {
    const deletedVehicle = await deleteVehicle(vehicleId, userId);
    res
      .status(200)
      .json(deletedVehicle);
  } catch (error) {
    next(createError(error));
  }
})

// GET /vehicles/available
router.get('/available', isLoggedIn, async (req, res, next) => {

  try {
    const useravailableVehicles = await getAllVehiclesAvailables();
    res
      .status(200)
      .json(useravailableVehicles);
  } catch (error) {
    next(createError(error));
  }
});

// GET /vehicles/:vehicleId
router.get('/:vehicleId', isLoggedIn, async (req, res, next) => {
  const { vehicleId } = req.params;

  try {
    const vehicle = await getVehicleById(vehicleId);

    res
      .status(200)
      .json(vehicle);
  } catch (error) {
    next(createError(error));
  }
})

// GET /vehicles
router.get('/', isLoggedIn, async (req, res, next) => {
  const userId = req.session.currentUser._id;

  try {
    const userVehicles = await getAllVehicles(userId);

    res
      .status(200)
      .json(userVehicles);
  } catch (error) {
    next(createError(error));
  }
});

module.exports = router;
