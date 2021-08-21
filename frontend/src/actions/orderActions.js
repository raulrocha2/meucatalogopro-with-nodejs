import axios from 'axios'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,  
    
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,

    MY_ORDER_DETAIL_REQUEST,
    MY_ORDER_DETAIL_SUCCESS,
    MY_ORDER_DETAIL_FAIL,

    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,

    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,

    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,

    CLEAR_ERRORS
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/orders/new-order`, order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

        localStorage.removeItem('cartItems')
        
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDERS_REQUEST})


        const { data } = await axios.get('/api/orders/me')

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

        
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myOrderDetail = (orderId) => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDER_DETAIL_REQUEST})


        const { data } = await axios.get(`/api/orders/detail/${orderId}`)

        dispatch({
            type: MY_ORDER_DETAIL_SUCCESS,
            payload: data.order
        })

        
    } catch (error) {
        dispatch({
            type: MY_ORDER_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ORDERS_REQUEST})


        const { data } = await axios.get('/api/admin/orders')

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

        
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ORDER_REQUEST})
        


        const { data } = await axios.delete(`/api/admin/orders/${id}`)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

        
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateOrder = (id, orderData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ORDER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/admin/orders/${id}`, orderData, config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

        
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}