/* eslint-disable no-unused-vars */
import React, {Fragment} from 'react'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../../App.css'
import Search from '../Search'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

function Header() {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading,  user } = useSelector(state => state.authReducer)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Desconectado com sucesso!')
    }

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                    <Link to='/'>
                        <img src="/images/logo.png" alt="" />
                    </Link>
                    </div>
                </div>
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

                    <Link to='/cart' style={{ textDecoration: 'none'}}>
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>

                    {user  ?  (
                        
                        <div className="ml-4 btn-group d-inline">
                           <Link to='#' 
                                type="button" 
                                className="btn btn-warning" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false"
                                id="dropDownMenuButton" 
                            >
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                    <Link className="dropdown-item" to="/orders/me">Pedidos</Link>
                                    <Link className="dropdown-item" to="/me">Minha Conta</Link>
                                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                        Logout
                                    </Link>
                            </div>
                        </div>

                    ) : !loading && 

                        <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
                    }
                    
                    
                </div>
            </nav>
        </Fragment>
    )
}

export default Header
