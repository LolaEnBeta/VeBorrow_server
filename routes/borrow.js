const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Borrow = require("../models/Borrow");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

//POST /borrow
router.post('/', isLoggedIn, async (req, res, next) => {
  const { ownerId, vehicleId, message } = req.body;
  const renterId = req.session.currentUser._id;
  try {
    const owner = await User.findById(ownerId);
    const renter = await User.findById(renterId);
    const vehicle = await Vehicle.findById(vehicleId);

    if (!owner || !renter || !vehicle) return next(createError(404));
    else {
      const borrow = await Borrow.create({ownerId, renterId, vehicleId, message});

      res
        .status(200)
        .json(borrow);
    }
  } catch (error) {
    next(createError(error));
  }
});

// PUT /borrow/:borrowId
router.put('/:borrowId', isLoggedIn, async (req, res, next) => {
  const { borrowId } = req.params;
  const { completed } = req.body;

  try {
    const borrow = await Borrow.findById(borrowId);

    if (!borrow) return next(createError(404));
    else {
      const borrowCompleted = await Borrow.findByIdAndUpdate({_id: borrowId}, {completed}, {new: true});

      res
        .status(201)
        .json(borrowCompleted);
    }
  } catch (error) {
    next(createError(error));
  }
})

// GET /borrow
router.get('/', isLoggedIn, async (req, res, next) => {
  const userId = req.session.currentUser._id;

  try {
    const user = await User.findById(userId);
    if (!user) return next(createError(404));
    else {
      const borrowListAsOwner = await Borrow.find({ownerId: userId});
      const borrowListAsRenter = await Borrow.find({renterId: userId});

      const borrowList = borrowListAsOwner.concat(borrowListAsRenter);

      res
        .status(200)
        .json(borrowList);
    }
  } catch (error) {
    next(createError(error))
  }
})

module.exports = router;
