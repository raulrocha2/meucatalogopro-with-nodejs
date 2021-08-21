import axios from 'axios';
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
    

    GET_PRODUCTS_ADMIN_REQUEST,
    GET_PRODUCTS_ADMIN_SUCCESS,
    GET_PRODUCTS_ADMIN_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,

    GET_REVIEWS_ADMIN_REQUEST,
    GET_REVIEWS_ADMIN_SUCCESS,
    GET_REVIEWS_ADMIN_FAIL,

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,

    CLEAR_ERRORS
} from '../constants/productConstants'

export const getProducts = (keyword= '', currentPage = 1, price, category, rating = 0 ) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST })

        
        let url = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
        
        if (category) {
            url = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(url)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const productDetail = ( id ) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST }) 

        const { data } = await axios.get(`/api/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}



export const createReview = ( reviewData ) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
                `/api/review/new`,
                reviewData,
                config
                )

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: GET_PRODUCTS_ADMIN_REQUEST })

        const { data } = await axios.get('/api/admin/products')

        dispatch({
            type: GET_PRODUCTS_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const createProduct = ( productData ) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
       
        const { data } = await axios.post(
                `/api/admin/product/new`,
                productData,
                config
                )

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message 
        })
    }
}


export const updateProduct = ( id, productData ) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
       
        const { data } = await axios.put(
                `/api/admin/product/${id}`,
                productData,
                config
                )

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message 
        })
    }
}


export const deleteProduct = ( id ) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST }) 

        const { data } = await axios.delete(`/api/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_ADMIN_REQUEST })

        const { data } = await axios.get(`/api/admin/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_ADMIN_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {
        dispatch({
            type: GET_REVIEWS_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteReview = ( productId ,id ) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST }) 

        const { data } = await axios.delete(`/api/admin/review/delete?productId=${productId}&id=${id}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
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