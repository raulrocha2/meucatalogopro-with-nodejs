import React, {Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import {
    updateOrder,
    myOrderDetail,
    clearErrors
} from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'



function ProcessOrder({ history, match }) {

    const [status, setStatus] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch()

    const { loading, error, order = {} } = useSelector(state => state.myOrderDetailReducer)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice } = order 
    const { error: errorUpate, isUpdated } = useSelector(state => state.orderReducer)

    useEffect(() => {

        dispatch(myOrderDetail(match.params.id))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if (isUpdated) {
            alert.success("Pedido Atualizado")
            history.push('/admin/orders');
            dispatch({ type: UPDATE_ORDER_RESET})
        }
        
        if (errorUpate) {
            alert.error(errorUpate)
            dispatch(clearErrors())
        }
       
    }, [dispatch, alert, error, history, isUpdated, errorUpate, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    // Checked order is Paid 
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    const updateOrderHandler = (id) => {

        const formData = new FormData();

        formData.set('status', status)

        console.log(formData);
        dispatch(updateOrder(id, formData))
        
    }
    return (
        <Fragment>
            <MetaData title='Atualizar Pedido'/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">
                                    <h2 className="my-5">Pedido: {order._id}</h2>

                                        <h4 className="mb-4">Endereço de Entrega</h4>
                                        <p><b>Nome:</b> {user && user.name}</p>
                                        <p><b>Telefone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                        <p className="mb-4">
                                            <b>Endereço:</b>{shippingDetails}
                                        </p>
                                        <p><b>Total:</b> R${totalPrice}</p>

                                        <hr />

                                        <h4 className="my-4">Pagamento</h4>
                                            <p className={isPaid ? "greenColor" : "redColor"}>
                                                <b>{isPaid ? "PAGO" : "NÃO PAGO"}</b>
                                            </p>


                                        <h4 className="my-4">Status do Pedido:</h4>
                                            {order.orderStatus && String(order.orderStatus).includes('Delivered') ? 
                                                <b className="greenColor">Entregue</b> : String(order.orderStatus).includes('Shipped') ?
                                                    <b className="goldColor">Enviado</b> : <b className="goldColor">Processando</b>
                                            } 


                                        <h4 className="my-4">Itens:</h4>

                                        <hr />
                                        <div className="cart-item my-1">
                                            {orderItems && orderItems.map(item => (
                                                <div key={item.product} className="row my-5">
                                                    <div className="col-4 col-lg-2">
                                                        <img src={item.image} alt={item.image} height="45" width="65" />
                                                    </div>

                                                    <div className="col-5 col-lg-5">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>


                                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                        <p>R${item.price.toFixed(2)}</p>
                                                    </div>

                                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                        <p>{item.quantity} un</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                </div>
                                    <hr />
                                    <div className="col-12 col-lg-3 mt-5">
                                        <h4 className="my-4">Status</h4>

                                        <div className="form-group">
                                            <select
                                                className="form-control"
                                                name='status'
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="Processing">Processando</option>
                                                <option value="Shipped">Enviado</option>
                                                <option value="Delivered">Entregue</option>
                                            </select>
                                        </div>

                                        <button 
                                            className="btn btn-primary btn-block"
                                            onClick={() => updateOrderHandler(order._id)}
                                        >
                                            Atualizar
                                        </button>
                                    </div>
                                
                            </div>
                            
                        )}
                        
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}

export default ProcessOrder
