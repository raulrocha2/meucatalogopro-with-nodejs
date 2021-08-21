import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/layout/Loader'
import MetaData from '../../components/layout/MetaData'
import { useAlert } from 'react-alert'


  
function Profile() {


    const { loading, user } = useSelector(state => state.authReducer)

    const alert = useAlert()
    const dispatch = useDispatch()

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Meu Perfil'} />
                    <div className="container container-fluid">
                        <div className="row justify-content-around mt-5 user-info">
                    
                            <div className="col-12 col-md-5">
                                <h4>Nome Completo</h4>
                                <p>{user.name}</p>
                    
                                <h4>Email </h4>
                                <p>{user.email}</p>

                                <h4>Conta Criado em </h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>

                                {user.role !== 'admin' && (
                                    <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                        Meus Pedidos
                                    </Link>
                                )}

                                <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                    Trocar Senha
                                </Link>

                                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                    Editar Conta
                                </Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
