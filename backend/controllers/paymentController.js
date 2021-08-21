const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


//Process stripe payments => /api/payment/process
exports.processPayment = catchAsyncErrors( async (req, res, next) => {

    const paymentIntents = await stripe.paymentIntents.create({

        amount : req.body.amount,
        currency: 'brl',
        metadata : { integration_check: 'accept_a_payment'}
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntents.client_secret
    })
})

//Process stripe api key => /api/payment/stripe-api
exports.sendStripeApiKey = catchAsyncErrors( async (req, res, next) => {

    
    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})