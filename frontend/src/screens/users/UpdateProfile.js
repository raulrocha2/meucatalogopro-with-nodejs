import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/layout/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layout/MetaData'
import {updateProfile, loadUser, clearErrors} from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'



function UpdateProfile({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const alert = useAlert()
    const { user } = useSelector(state => state.authReducer)
    const { error, isUpdated, loading } = useSelector(state => state.updateUserReducer)


    const dispatch = useDispatch()

    useEffect(() => {

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setPhone(user.phone)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Dados Atualizados com sucesso')
            dispatch(loadUser())
            history.push('/me')
            dispatch({type: UPDATE_PROFILE_RESET })
        }

    }, [dispatch, error, isUpdated, alert, history, user])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.set('name', name);
        formData.set('email', email);
        formData.set('phone', phone);
           
        dispatch(updateProfile(formData))
    }


    return (
        <Fragment>
            <MetaData title={'Atualizando Cadastro'} />
            <div className="container-container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mt-2 mb-5">Atualizar Conta</h1>

                            <div className="form-group">
                                <label for="email_field">Nome</label>
                                <input 
                                    type="name" 
                                    id="name_field" 
                                    className="form-control"
                                    name='name'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label for="email_field">Celular</label>
                                <input 
                                    type="phone" 
                                    id="phone_field" 
                                    className="form-control"
                                    name='phone'
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label for="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn update-btn btn-block mt-4 mb-3" 
                                disabled={loading ? true : false}
                            >
                                Salvar
                            </button>
                        </form>
                    </div>
                </div>
                    
            </div>

        </Fragment>
    )
}

export default UpdateProfile
