const express = require("express");
const router = express.Router();

const User = require("../models/user");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

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
})

module.exports = router;
