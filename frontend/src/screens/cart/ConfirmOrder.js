import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../components/layout/MetaData'
import CheckoutSteps from './CheckoutSteps'


function ConfirmOrder({history}) {

    const { cartItems } = useSelector(state => state.cart)
    const { shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.authReducer)

    //Calculate Order Prices 
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const shippingPrice = itemsPrice >= 500 ? 0 : 25
    const totalPrice = (itemsPrice + shippingPrice).toFixed(2)

    const processToPayment = () => {
        const data = {

            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/order/payment')
    }
    return (
        <Fragment>
            <MetaData title={'Confirmar Pedido'} />
            <CheckoutSteps shipping confirmOrder />
            <div class="container container-fluid">
        
                <div class="row d-flex justify-content-between">
                    <div class="col-12 col-lg-8 mt-5 order-confirm">

                        <h4 class="mb-3">Dados da Entrega</h4>
                        <p><b>Nome:</b> {user.name}</p>
                        <p><b>Telefone:</b> {user.phone}</p>
                        <p class="mb-4"><b>Endereço:</b> 
                            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
                        </p>
                        
                        <hr />
                        <h4 class="mt-4">Itens do seu Pedido:</h4>

                        <hr />
                        {cartItems.map(item => (
                            <div class="cart-item my-1" key={item.product}>
                                <div class="row">
                                    <div class="col-4 col-lg-2">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            height="45" 
                                            width="65" 
                                        />
                                    </div>

                                    <div class="col-5 col-lg-6">
                                        <Link 
                                            to={`/product/${item.product}`}
                                        >{item.name}</Link>
                                    </div>


                                    <div class="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x {item.price} = <b>R$ {(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                        ))}
                        
                        <hr />

                    </div>
                    
                    <div class="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Pedido</h4>
                                <hr />
                                <p>Sub total:  
                                    <span class="order-summary-values">
                                        R${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} 
                                    </span>
                                </p>
                                <p>Entrega: <span class="order-summary-values">R${shippingPrice}</span></p>
                        
                                <hr />

                                <p>Total: 
                                    <span class="order-summary-values">
                                        R${totalPrice} 
                                    
                                    </span>
                                </p>

                                <hr />
                                <button id="checkout_btn" class="btn btn-primary btn-block" onClick={processToPayment}>Prosseguir</button>
                            </div>
                    </div>
                    
                    
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder
