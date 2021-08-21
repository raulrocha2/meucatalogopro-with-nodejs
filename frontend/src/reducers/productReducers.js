import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,  
    NEW_REVIEW_RESET, 

    GET_PRODUCTS_ADMIN_REQUEST,
    GET_PRODUCTS_ADMIN_SUCCESS,
    GET_PRODUCTS_ADMIN_FAIL,   

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,   
    NEW_PRODUCT_RESET,  

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,   
    UPDATE_PRODUCT_RESET,  
    
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,   
    DELETE_PRODUCT_RESET,  

    GET_REVIEWS_ADMIN_REQUEST,
    GET_REVIEWS_ADMIN_SUCCESS,
    GET_REVIEWS_ADMIN_FAIL,   

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,

    CLEAR_ERRORS 

} from '../constants/productConstants'

export const productsReducer = (state = { products: [] }, action) => {

    switch(action.type) {

        case ALL_PRODUCTS_REQUEST:
        case GET_PRODUCTS_ADMIN_REQUEST:
            return {
                loading: true,
                products: []
            }
        
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductionsCount: action.payload.filteredProductionsCount
            }
        
        case GET_PRODUCTS_ADMIN_SUCCESS:
            return {
                loading: false,
                products: action.payload.products

            }
        case ALL_PRODUCTS_FAIL:
        case GET_PRODUCTS_ADMIN_FAIL:
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

export const productDetailReducer = (state = { product: {} }, action) => {

    switch(action.type) {

        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
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

export const newReviewReducer = (state = {}, action) => {

    switch(action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
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

export const newProductReducer = (state = { product: {} }, action) => {

    switch(action.type) {

        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }
        
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
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


export const productReducer = (state = { }, action) => {

    switch(action.type) {

        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }
        
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_PRODUCT_RESET:
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


export const getReviewslReducer = (state = { reviews: [] }, action) => {

    switch(action.type) {

        case GET_REVIEWS_ADMIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case GET_REVIEWS_ADMIN_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }
        
        case GET_REVIEWS_ADMIN_FAIL:
            return {
                ...state,
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

export const deleteReviewslReducer = (state = { }, action) => {

    switch(action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }
        
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
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