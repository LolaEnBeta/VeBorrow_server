const express = require("express");
const router = express.Router();

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
  const { firstName, lastName, phoneNumber, owner } = req.body;

  try {
    const user = await User.findByIdAndUpdate({_id: userId}, {firstName, lastName, phoneNumber, owner}, {new: true});

    if(!user) return next(createError(400));
    else {
      user.password = "*";
      req.session.currentUser = user;

      res
        .status(201)
        .json(user);
    }
  } catch (error) {
    next(createError(error));
  }
});

// DELETE /user/:userId
router.delete('/:userId', isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;

  try {
    await User.deleteOne({_id: userId});

    res
      .status(200)
      .send();
  } catch (error) {
    next(createError(error));
  }
})

// GET /user/:userId
router.get('/:userId', isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) return next(createError(400));
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
