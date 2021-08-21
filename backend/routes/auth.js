const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    // ADMIN 
    getAllusers,
    getUserDetail,
    updateUser,
    deleteUser
} = require('../controllers/authController')
const { 
    isAuthenticatedUser, 
    authorizeRoles 
} = require('../middlewares/auth')

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/me').get(isAuthenticatedUser, getUserProfile);
router.route('/user/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/user/me/update/password').put(isAuthenticatedUser, updatePassword);
router.route('/user/password/forgot').post(forgotPassword);
router.route('/user/password/reset/:token').put(resetPassword);
router.route('/user/logout').post(logoutUser);

//ADMIN ROUTES
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllusers);
router.route('/admin/user/:id')
                        .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetail)
                        .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
                        .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);


module.exports = router;