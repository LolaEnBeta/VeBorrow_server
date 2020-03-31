const express = require("express");
const router = express.Router();
require('dotenv').config();
const webpush = require('web-push');

const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Borrow = require("../models/Borrow");

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

//Subscribe Route
router.post('/:userId', async (req, res) => {
  //Get pushSubscription object
  const subscription = req.body;
  const {userId} = req.params;

  console.log(subscription);

  //Send 201 status - resource created
  res.status(201).json({});

  //Create payload
  const payload = JSON.stringify({ title: 'Push Test' });

  await User.findByIdAndUpdate({_id: userId}, {subscription: subscription}, {new: true})
});

module.exports = router;
