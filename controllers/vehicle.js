const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const vehicleUseCase = require("../use-cases/vehicles.use-case");
// TODO Create common interface for all use cases

const {
  isLoggedIn,
} = require("../helpers/middlewares");

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
