const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

// PUT /user/:userId
router.post('/:userId', isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, phoneNumber } = req.body;

  try {
    const user = await User.findById(userId);

    if(!user) return next(createError(404));
    else {
      const userUpdated = await User.findByIdAndUpdate({_id: userId}, {firstName, lastName, phoneNumber}, {new: true}).populate('vehicles');

      user.password = "*";
      req.session.currentUser = user;

      res
      .status(201)
      .json(userUpdated);
    }
  } catch (error) {
    next(createError(error));
  }
});

// DELETE /user/:userId
router.delete('/:userId', isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) return next(createError(404));
    else {
      await User.deleteOne({_id: userId});

      req.session.destroy();

      res
        .status(200)
        .send();
    }

  } catch (error) {
    next(createError(error));
  }
})

// GET /user/:userId
router.get('/:userId', isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('vehicles');

    if (!user) return next(createError(404));
    else {
      user.password = "*";
      req.session.currentUser = user;

      res
        .status(200)
        .json(user);
    }
  } catch (error) {
    next(createError(error));
  }
});

module.exports = router;
