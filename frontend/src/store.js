import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productsReducer,
    productDetailReducer,
    newReviewReducer,
    newProductReducer,
    productReducer,
    getReviewslReducer,
    deleteReviewslReducer
} from './reducers/productReducers'
import {
    authReducer,
    updateUserReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userAdminReducer,
    userDetailReducer
} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'
import {
    createOrderReducer,
    myOrdersReducer,
    myOrderDetailReducer,
    allOrdersReducer,
    orderReducer
} from './reducers/orderReducers'


const reducer = combineReducers ({

    // Users
    authReducer: authReducer,
    updateUserReducer: updateUserReducer,
    forgotPasswordReducer: forgotPasswordReducer,

    //ADMIN
    allUsersReducer: allUsersReducer,
    newProductReducer: newProductReducer,
    productReducer: productReducer,
    allOrdersReducer: allOrdersReducer,
    orderReducer: orderReducer,
    userAdminReducer: userAdminReducer,
    userDetailReducer: userDetailReducer,
    getReviewslReducer: getReviewslReducer,
    deleteReviewslReducer: deleteReviewslReducer,


    //Product Reducers
    productsReducer: productsReducer,
    productDetailReducer: productDetailReducer,

    //Review
    newReviewReducer: newReviewReducer,

    //Cart
    cart: cartReducer,

    //Order
    createOrderReducer: createOrderReducer,
    myOrdersReducer: myOrdersReducer,
    myOrderDetailReducer: myOrderDetailReducer,

    
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo') 
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;