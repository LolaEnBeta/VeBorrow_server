const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const vehicleUseCase = require("../use-cases/vehicles.use-case");

// HELPER FUNCTIONS
const {
  isLoggedIn,
} = require("../helpers/middlewares");

// POST /vehicles
router.post('/', isLoggedIn, async (req, res) => {
  const { type } = req.body;
  const ownerId = req.session.currentUser._id;

  try {
    const newVehicle = await vehicleUseCase.createVehicle(type, ownerId);

    res
      .status(201)
      .json(newVehicle);
  } catch (error) {
    createError(error);
  }
});

// PUT /vehicles/:vehicleId
router.put('/:vehicleId', isLoggedIn, async (req, res) => {
  const { vehicleId } = req.params;
  const { latitude, longitude, available } = req.body;

  try {
    const vehicleUpdated = await vehicleUseCase.updateVehicle(vehicleId, latitude, longitude, available);
    res
      .status(201)
      .json(vehicleUpdated);
  } catch (error) {
    createError(error);
  }
})

// DELETE /vehicles/:vehicleId
router.delete('/:vehicleId', isLoggedIn, async (req, res) => {
  const { vehicleId } = req.params;
  const userId = req.session.currentUser._id

  try {
    const deletedVehicle = await vehicleUseCase.deleteVehicle(vehicleId, userId);
    res
      .status(200)
      .json(deletedVehicle);
  } catch (error) {
    createError(error);
  }
})

// GET /vehicles/available
router.get('/available', isLoggedIn, async (req, res) => {

  try {
    const useravailableVehicles = await vehicleUseCase.getAllVehiclesAvailables();
    res
      .status(200)
      .json(useravailableVehicles);
  } catch (error) {
    createError(error);
  }
});

// GET /vehicles/:vehicleId
router.get('/:vehicleId', isLoggedIn, async (req, res) => {
  const { vehicleId } = req.params;

  try {
    const vehicle = await vehicleUseCase.getVehicleById(vehicleId);

    res
      .status(200)
      .json(vehicle);
  } catch (error) {
    createError(error);
  }
})

// GET /vehicles
router.get('/', isLoggedIn, async (req, res) => {
  const userId = req.session.currentUser._id;

  try {
    const userVehicles = await vehicleUseCase.getAllVehicles(userId);

    res
      .status(200)
      .json(userVehicles);
  } catch (error) {
    createError(error);
  }
});

module.exports = router;
