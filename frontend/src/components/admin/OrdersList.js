import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import {
    allOrders,
    deleteOrder,
    clearErrors
} from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'



function OrdersList({ history }) {

    const alert = useAlert();
    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.allOrdersReducer)
    const { error: errorDelete, isDeleted } = useSelector(state => state.orderReducer)

    useEffect(() => {

        dispatch(allOrders())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if (isDeleted) {
            alert.success("Pedido Deletado")
            history.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET})
        }
        
        if (errorDelete) {
            alert.error(errorDelete)
            dispatch(clearErrors())
        }
       
    }, [dispatch, alert, error, history, isDeleted, errorDelete])

    
    const deleteOrdertHandler = (id) => {
        
        if (window.confirm('Deseja excluir este pedido ?')) {
            
            dispatch(deleteOrder(id))
        }
    }
    

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'Numero do Pedido',
                    field: 'id',
                    sort: 'asc'
                },
            
                {
                    label: 'Total',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Detalhes',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.forEach( order => {
            data.rows.push({
                id: order._id,
                amount: `R$${order.totalPrice.toFixed(2)}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') 
                    ? <b className="greenColor">Entregue</b> : String(order.orderStatus).includes('Shipped') 
                        ? <b className="goldColor">Enviado</b> : <b className="redColor">Processando</b>,
                actions: 
                    <Fragment>
                        <Link 
                            to={`/admin/order/update/${order._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>

                        <button onClick={() => deleteOrdertHandler(order._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                    
            })
        })
        return data;
    }


    return (
        <Fragment>
            <MetaData title='Pedidos'/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Pedidos</h1>

                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setOrders()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover 
                                />
                            )}
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}


export default OrdersList
