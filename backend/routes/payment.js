const express = require('express');
const router = express.Router();

const { 
    processPayment,
    sendStripeApiKey
 } = require('../controllers/paymentController');
 
const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/payment/stripe-api').get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router; 