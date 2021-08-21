const express = require('express');
const router = express.Router();

const { 
    newOrder, 
    getSingleOrder, 
    myOrders, 
    adminAllOrders,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/orders/new-order').post(isAuthenticatedUser, newOrder);
router.route('/orders/detail/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

//ADMIN
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), adminAllOrders);
router.route('/admin/orders/:id')
            .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
            .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);


module.exports = router;