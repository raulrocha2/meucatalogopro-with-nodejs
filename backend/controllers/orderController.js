const Order = require('../models/order');
const Product = require('../models/products');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const order = require('../models/order');


// Create new order => /api/order/new-order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    
    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        paymentInfo,
        taxPrice,
        shippingPrice,
        totalPrice
        
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        paymentInfo,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })


    res.status(200).json({
        success: true,
        order
    })
})

// Get Single order => /api/order/detail/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


// Get logged in user orders   =>   /api/order/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})

//ADMIN 
// Get All Admin orders   =>   /api/admin/orders
exports.adminAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find()


    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })


    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//Update / Process Order Admin => /api/admin/orders/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler('Order not found', 404));
    }
    
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        message:"Order was updated"
    })
})

async function updateStock(id, quantity) {

    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false})
}


//Delete  Order Admin => /api/admin/orders/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        message: "order was Deleted"
    })
})