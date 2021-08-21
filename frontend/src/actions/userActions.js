import axios from 'axios'
import {

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL, 

    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,  

    ALL_USERS_ADMIN_REQUEST,
    ALL_USERS_ADMIN_SUCCESS,
    ALL_USERS_ADMIN_FAIL,
    
    DELETE_USERS_REQUEST,
    DELETE_USERS_SUCCESS,
    DELETE_USERS_FAIL, 

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,

    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    CLEAR_ERRORS

} from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/user/login`,
            {email, password},
            config
            )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//Register
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/user/register`,
            userData,
            config
            )

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


//Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `/api/user/me/update`,
            userData,
            config
            )

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `/api/user/me/update/password`,
            passwords,
            config
            )

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}



//Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            `/api/user/password/forgot`,
            email,
            config
            )

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}



//Forgot Password New password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `/api/user/password/reset/${token}`, 
            passwords,
            config
            )

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load user
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST }) 

        const { data } = await axios.get(`/api/user/me`)

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}




//Logout
export const logout = () => async (dispatch) => {
    try {

        await axios.post('/api/user/logout')

        dispatch({
            type: LOGOUT_SUCCESS,
            
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

//ADMIN
export const getAllUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_ADMIN_REQUEST })

        const { data } = await axios.get('/api/admin/users')

        dispatch({
            type: ALL_USERS_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USERS_REQUEST })

        const { data } = await axios.delete(`/api/admin/user/${id}`)

        dispatch({
            type: DELETE_USERS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const userDetail = ( id ) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAIL_REQUEST }) 

        const { data } = await axios.get(`/api/admin/user/${id}`)

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST }) 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
                    `/api/admin/user/${id}`,
                    userData,
                    config
                )

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
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