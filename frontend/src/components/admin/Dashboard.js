import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import {getAdminProducts} from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { getAllUsers } from '../../actions/userActions'

function Dashboard() {

    const dispatch = useDispatch()

    const { products } = useSelector(state => state.productsReducer)
    const { loading, orders, totalAmount } = useSelector(state => state.allOrdersReducer)
    const { users } = useSelector(state => state.allUsersReducer)

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(getAllUsers())
       
    }, [dispatch])

    let outOfStock = 0;
    products.forEach(product => {
        if(product.stock === 0) {
            outOfStock += 1;
        }
    });

    return (
        <Fragment>
            <MetaData title='Dashboard' />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                {loading ? <Loader /> : (
                    <Fragment>
                        <MetaData title={'Admin Dashboard'} />
                        <div className="col-12 col-md-10">
                            <h1 className="my-4">Dashboard</h1>
                                <div className="row pr-4">
                                    <div className="col-xl-12 col-sm-12 mb-3">
                                        <div className="card text-white bg-primary o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Valor total <br /> <b>R${totalAmount && totalAmount.toFixed(2)}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row pr-4">
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-success o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Produtos<br /> 
                                                    <b>{products && products.length}</b>
                                                </div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                                <span className="float-left">Detalhes...</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Pedidos<br /> <b>{orders && orders.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                <span className="float-left">Detalhes...</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-info o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Usuários<br /> <b>{users && users.length}</b></div>
                                            </div>
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                <span className="float-left">Detalhes...</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-warning o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">Fora do estoque<br /> 
                                                    <b>{outOfStock}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </Fragment>
                ) }
                
            </div>
            
        </Fragment>
    )
}

export default Dashboard
