import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layout/MetaData'
import {resetPassword, clearErrors} from '../../actions/userActions'


function ResetPassword({ history, match }) {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')   

    const alert = useAlert()
    
    const { error, success } = useSelector(state => state.forgotPasswordReducer)


    const dispatch = useDispatch()

    useEffect(() => {
         
        if (error) {
            alert.error('Link para troca de senha invalido')
            dispatch(clearErrors());
        }

        if (success) {

            alert.success('Dados Atualizados com sucesso')
            history.push('/login')
        }

    }, [dispatch, error, success, alert, history])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
           
        dispatch(resetPassword(match.params.token, formData))
    }

    return (
        <Fragment>
            <MetaData title={'Reset Senha'} />
            <div class="container-container-fluid">
                <div class="row wrapper">
                    <div class="col-10 col-lg-5">
                        <form class="shadow-lg" onSubmit={submitHandler}>
                            <h1 class="mb-3">Nova Senha</h1>

                            <div class="form-group">
                                <label for="password_field">Senha</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    class="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div class="form-group">
                                <label for="confirm_password_field">Confirmar Senha</label>
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    class="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button
                                id="new_password_button"
                                type="submit"
                                class="btn btn-block py-3">
                                Salvar
                            </button>

                        </form>
                    </div>
                </div>
                
            </div>
        </Fragment>
    )
}

export default ResetPassword
