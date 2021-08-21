import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from '../../components/layout/MetaData'
import {register, clearErrors} from '../../actions/userActions'


function Register({history}) {

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })

    const { name, email, phone, password } = user; 

    const alert = useAlert()
    const { error, isAuthenticated } = useSelector(state => state.authReducer)


    const dispatch = useDispatch()

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
    }, [dispatch, error, isAuthenticated, alert, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set('name', name);
        formData.set('email', email);
        formData.set('phone', phone);
        formData.set('password', password);
           
        dispatch(register(formData))
    }

    const onChange = e => {
        
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <frameElement>
            <MetaData title={'Register'} />
            <div class="container container-fluid">
                <div class="row wrapper">
                    <div class="col-10 col-lg-5">
                        <form class="shadow-lg" onSubmit={submitHandler}>
                            <h1 class="mb-3">Registrar</h1>

                            <div class="form-group">
                                <label for="email_field">Nome</label>
                                <input 
                                    type="name" 
                                    id="name_field" 
                                    class="form-control" 
                                    name='name'
                                    required
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>

                            <div class="form-group">
                                <label for="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    class="form-control"
                                    name='email'
                                    required
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div class="form-group">
                                <label for="email_field">Celular</label>
                                <input
                                    type="phone"
                                    id="phone_field"
                                    class="form-control"
                                    name='phone'
                                    required
                                    value={phone}
                                    onChange={onChange}
                                />
                            </div>
                
                            <div class="form-group">
                                <label for="password_field">Senha</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    class="form-control"
                                    name='password'
                                    required
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>

                                <button
                                    id="register_button"
                                    type="submit"
                                    class="btn btn-block py-3"
                                >
                                    REGISTRAR
                                </button>
                            </form>
                    </div>
                </div>
            </div>
        </frameElement>
    )
}

export default Register
