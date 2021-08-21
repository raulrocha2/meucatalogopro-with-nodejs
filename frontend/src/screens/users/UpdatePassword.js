import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layout/MetaData'
import {updatePassword, clearErrors} from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'


function UpdatePassword({ history }) {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
   

    const alert = useAlert()
    const { user } = useSelector(state => state.authReducer)
    const { error, isUpdated, loading } = useSelector(state => state.updateUserReducer)


    const dispatch = useDispatch()

    useEffect(() => {
         
        if (error) {
            alert.error('Senha antiga incorreta')
            dispatch(clearErrors());
        }

        if (isUpdated) {

            alert.success('Dados Atualizados com sucesso')
            history.push('/me')
            dispatch({type: UPDATE_PASSWORD_RESET })
        }

    }, [dispatch, error, isUpdated, alert, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
           
        dispatch(updatePassword(formData))
    }
    return (
        <Fragment>
            <MetaData title={'Editar Senha'} />
            <div className="container-container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler }>
                            <h1 className="mb-3">Criar nova senha</h1>

                            <div className="form-group">
                                <label for="password_field">Antiga Senha</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label for="confirm_password_field">Nova Password</label>
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    className="form-control"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                id="new_password_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                                >
                                ATUALIZAR
                            </button>

                        </form>
                    </div>
                </div>
                
            </div>
            
        </Fragment>
    )
}

export default UpdatePassword
