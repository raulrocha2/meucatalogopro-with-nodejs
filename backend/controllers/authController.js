const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')


//Register New user => /api/user/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    
    const { name, email, phone, password } = req.body;

    const user = await User.create({
        name,
        email,
        phone,
        password
    })

    sendToken(user, 200, res)
  
})

//Login user and send token cookie => api/user/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
 
    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid  Password', 401));
    }

    sendToken(user, 200, res)
})

//Get currently logged user detail => /api/user/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })

})

//Update change password => /api/user/password/update
exports.updatePassword = catchAsyncErrors (async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //Check previous user password
    const isMathed = await user.comparePassword(req.body.oldPassword)
    if (!isMathed) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }
    user.password = req.body.password;
    await user.save()

    sendToken(user, 200, res)
})

//Update Profile => /api/user/me/update
exports.updateProfile = catchAsyncErrors (async (req, res, next) => {

    const newData = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Forgot Password   =>  /api/user/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Me catalogo pro password recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }

})

//Reset Password => /user/password/reset
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()}
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    //Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
})

//Logout user => /api/user/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true

    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

// ADMIN ROUTES 

// Get all users => /api/admin/users
exports.getAllusers= catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get Users Detail => /api/admin/user/:id
exports.getUserDetail = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Get Users Detail => /api/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {

    const newData = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })

})

// Delete Users Detail => /api/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 404))
    }

    
    await user.remove();

    res.status(200).json({
        success: true,
        message: 'User was deleted'
    })
})