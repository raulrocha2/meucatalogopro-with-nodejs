import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/layout/Loader'
import MetaData from '../../components/layout/MetaData'
import {login, clearErrors} from '../../actions/userActions'


function Login({history, location}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const { loading, error, isAuthenticated } = useSelector(state => state.authReducer)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            history.push(redirect)
        }
        
        if (error) {
            dispatch(clearErrors())
        }
    
    }, [dispatch, isAuthenticated, history, error, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />
                    <div className="row wrapper"> 
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                <label for="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                </div>
                    
                                <div className="form-group">
                                <label for="password_field">Senha</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                </div>

                                <Link to='/password/forgot' className="float-right mb-4">Esqueceu Senha?</Link>
                    
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGAR
                                </button>

                                <Link to='/register' className="float-right mt-3">Novo Usuário?</Link>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
            
        </Fragment>
    )
}

export default Login
