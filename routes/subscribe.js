const express = require("express");
const router = express.Router();
require('dotenv').config();
const webpush = require('web-push');

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
router.post('/subscribe', isLoggedIn, (req, res) => {
  //Get pushSubscription object
  const subscription = req.body;
  console.log(subscription);

  //Send 201 status - resource created
  res.status(201).json({});

  //Create payload
  const payload = JSON.stringify({ title: 'Push Test' });


  //Pass object into sendNotification
  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error);
  });
});

module.exports = router;
