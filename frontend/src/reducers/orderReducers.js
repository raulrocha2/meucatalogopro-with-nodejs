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
    DELETE_ORDER_RESET,


    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,   
    UPDATE_ORDER_RESET,

    CLEAR_ERRORS
} from '../constants/orderConstants'



export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state;
    }
}

export const myOrdersReducer = (state = {orders : []}, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                loading: true
            }
        
        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        
        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state;
    }
}

export const myOrderDetailReducer = (state = {order : {}}, action) => {
    switch (action.type) {
        case MY_ORDER_DETAIL_REQUEST:
            return {
                loading: true
            }
        
        case MY_ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        
        case MY_ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state;
    }
}

// GET ALL ORDERS ADMIN
export const allOrdersReducer = (state = {orders : []}, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                loading: true
            }
        
        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }
        
        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state;
    }
}

// ORDERS ADMIN
export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
            return {
                loading: true
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }
        
        case DELETE_ORDER_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }
        
        case DELETE_ORDER_FAIL:
        case UPDATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state;
    }
}