import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/layout/Loader'
import MetaData from '../../components/layout/MetaData'
import { useAlert } from 'react-alert'
import {myOrderDetail, clearErrors} from '../../actions/orderActions'

function MyOrderDetail({match}) {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, order = {}} = useSelector(state => state.myOrderDetailReducer)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice } = order

    useEffect(() => {

        dispatch(myOrderDetail(match.params.id))

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    // Checked order is Paid 
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={`Detalhe Pedido`} />
            {loading ? <Loader /> : (
                <div className="container container-fluid">
	
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">
    
                            <h1 className="my-5">Pedido: {order._id}</h1>
    
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
                                    <b className="greenColor">{order.orderStatus}</b> : <b className="redColor">{order.orderStatus}</b>
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
                            <hr />
                        </div>
                    </div>
                    
                </div>
            )}
            
        </Fragment>
    )
}

export default MyOrderDetail
