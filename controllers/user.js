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
router.put('/:userId', isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, phoneNumber } = req.body;

  try {
    const user = await User.findById(userId);

    if(!user) return createError(404);
    else {
      const userUpdated = await User.findByIdAndUpdate({_id: userId}, {firstName, lastName, phoneNumber}, {new: true}).populate('vehicles');

      userUpdated.password = "*";
      req.session.currentUser = userUpdated;

      res
      .status(201)
      .json(userUpdated);
    }
  } catch (error) {
    createError(error);
  }
});

// DELETE /user/:userId
router.delete('/:userId', isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) return createError(404);
    else {
      await User.deleteOne({_id: userId});

      req.session.destroy();

      res
        .status(204)
        .send();
    }

  } catch (error) {
    createError(error);
  }
})

// GET /user/:userId
router.get('/:userId', isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('vehicles');

    if (!user) return createError(404);
    else {
      user.password = "*";
      req.session.currentUser = user;
      
      res
        .status(200)
        .json(user);
    }
  } catch (error) {
    createError(error);
  }
});

module.exports = router;
