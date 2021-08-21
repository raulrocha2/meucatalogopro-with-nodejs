import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layout/MetaData'
import {forgotPassword, clearErrors} from '../../actions/userActions'


function ForgotPassword() {

    const [email, setEmail] = useState('')

   

    const alert = useAlert()
   
    const { error, message, loading } = useSelector(state => state.forgotPasswordReducer)


    const dispatch = useDispatch()

    useEffect(() => {
         
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }

        if (message) {

            alert.success(message)
            
        }

    }, [dispatch, error, message, alert])

    const submitHandler = (e) => {
        e.preventDefault()
        setEmail(email)
        dispatch(forgotPassword({email}))
    }
    return (
        <Fragment>
            <MetaData title={'Esqueceu Senha'} />
            <div class="container-container-fluid">
                <div class="row wrapper">
                        <div class="col-10 col-lg-5">
                            <form class="shadow-lg" onSubmit={submitHandler}>
                                <h1 class="mb-3">Esqueceu Senha</h1>
                                <div class="form-group">
                                    <label for="email_field">Email Cadastrado</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        class="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="forgot_password_button"
                                    type="submit"
                                    class="btn btn-block py-3"
                                    disabled={loading ? true : false}>
                                    Enviar Email
                            </button>

                            </form>
                        </div>
                    </div>
                
            </div>
            
        </Fragment>
    )
}

export default ForgotPassword
