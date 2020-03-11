const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const webpush = require('web-push');

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

      owner.borrowList.push(borrow._id);
      renter.borrowList.push(borrow._id);

      await User.findByIdAndUpdate({_id: owner._id}, {borrowList: owner.borrowList}, {new: true});
      await User.findByIdAndUpdate({_id: renter._id}, {borrowList: renter.borrowList}, {new: true});

      res
        .status(200)
        .json(borrow);
    }
  } catch (error) {
    next(createError(error));
  }
});

// PUT /borrow/accepted/:borrowId
router.put('/accepted/:borrowId', isLoggedIn, async (req, res, next) => {
  const { borrowId } = req.params;
  const { vehicleId } = req.body;

  try {
    const borrow = await Borrow.findById(borrowId);

    if (!borrow) return next(createError(404));
    else {
      const borrowAccepted = await Borrow.findByIdAndUpdate({_id: borrowId}, {accepted: true}, {new: true});
      await Vehicle.findByIdAndUpdate({_id: vehicleId}, {inUse: true, available: false}, {new: true});

      let renterUser = await User.findById(borrowAccepted.renterId)
      const payload = JSON.stringify({ title: 'Your borrow is accepted! Enjoy it =)' });

      //Pass object into sendNotification
      webpush.sendNotification(renterUser.subscription, payload).catch(error => {
        console.error(error);
      });

      res
        .status(201)
        .json(borrowAccepted);
    }
  } catch (error) {
    next(createError(error));
  }
});


// PUT /borrow/rejected/:borrowId
router.put('/rejected/:borrowId', isLoggedIn, async (req, res, next) => {
  const { borrowId } = req.params;

  try {
    const borrow = await Borrow.findById(borrowId);

    if (!borrow) return next(createError(404));
    else {
      const borrowRejected = await Borrow.findByIdAndUpdate({_id: borrowId}, {rejected: true}, {new: true});

      let renterUser = await User.findById(borrowRejected.renterId)
      const payload = JSON.stringify({ title: 'Your borrow is rejected! >.<   Try another one...' });

      //Pass object into sendNotification
      webpush.sendNotification(renterUser.subscription, payload).catch(error => {
        console.error(error);
      });
      res
        .status(201)
        .json(borrowRejected);
    }
  } catch (error) {
    next(createError(error));
  }
});

// PUT /borrow/completed/:borrowId
router.put('/completed/:borrowId', isLoggedIn, async (req, res, next) => {
  const { borrowId } = req.params;
  const { vehicleId, latitude, longitude} = req.body;

  try {
    const borrow = await Borrow.findById(borrowId);

    if (!borrow) return next(createError(404));
    else {
      const borrowCompleted = await Borrow.findByIdAndUpdate({_id: borrowId}, {completed: true, latitude, longitude}, {new: true});
      await Vehicle.findByIdAndUpdate({_id: vehicleId}, {inUse: false, available: true}, {new: true});

      let user = await User.findById(borrowCompleted.ownerId)
      const payload = JSON.stringify({ title: 'Your vehicle has been returned! Thanks for sharing it! =)' });

      //Pass object into sendNotification
      webpush.sendNotification(user.subscription, payload).catch(error => {
        console.error(error);
      });
      res
        .status(201)
        .json(borrowCompleted);
    }
  } catch (error) {
    next(createError(error));
  }
});

// GET /borrow
router.get('/', isLoggedIn, async (req, res, next) => {
  const userId = req.session.currentUser._id;

  try {
    const user = await User.findById(userId);
    if (!user) return next(createError(404));
    else {
      const borrowListAsOwner = await Borrow.find({ownerId: userId}).populate('vehicleId ownerId renterId');
      const borrowListAsRenter = await Borrow.find({renterId: userId}).populate('vehicleId ownerId renterId');

      const borrowList = borrowListAsOwner.concat(borrowListAsRenter);

      res
        .status(200)
        .json(borrowList);
    }
  } catch (error) {
    next(createError(error))
  }
});

module.exports = router;
