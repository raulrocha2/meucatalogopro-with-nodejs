const express = require('express');
const router = express.Router();

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    getAdminProducts
} = require('../controllers/productionController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/admin/product/:id')//Update and Delete
                    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
                    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

                
// Reviews
router.route('/review/new').put(isAuthenticatedUser, createProductReview)
router.route('/admin/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/admin/review/delete').delete(isAuthenticatedUser, deleteReview)
module.exports = router;