import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../components/layout/MetaData'
import {addItemToCart, removeItemCart} from '../../actions/cartActions'


function Cart({history}) {

    const dispatch = useDispatch()

    const { cartItems } = useSelector(state => state.cart)


    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1 ;

        if (newQty >= stock ) return;

        dispatch(addItemToCart(id, newQty));
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity -1 ;

        if (newQty <= 0 ) return;

        dispatch(addItemToCart(id, newQty));
    }

    const removeItemCartHandler = (id) => {

        dispatch(removeItemCart(id))
    }

    const checkoutHandler = () => {

        history.push('/login?redirect=shipping')
    }

    return (
        <Fragment>
            <MetaData title={'Carrinho'}/>
            {cartItems.length === 0 
                ? <h2 className="mt-5">Carrinho Vazio <Link to='/'>Voltar para loja</Link> </h2> : ( 
                
                    <Fragment> 
                        <h2 className="mt-5">Seu Carrinho: <b>{cartItems.length} items</b></h2>
                            <div className="row d-flex justify-content-between">
                                <div className="col-12 col-lg-8">
                                    {cartItems.map(item => (
                                        <Fragment>
                                            <hr />
                                            <div className="cart-item" key={item.product}>
                                                <div className="row">
                                                    <div className="col-4 col-lg-3">
                                                        <img src={item.image} 
                                                            alt={item.name} 
                                                            height="90" 
                                                            width="115" 
                                                        />
                                                    </div>

                                                    <div className="col-5 col-lg-3">
                                                        <Link 
                                                            to={`/product/${item.product}`}
                                                        >{item.name}</Link>
                                                    </div>


                                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                        <p id="card_item_price">R${item.price.toFixed(2)}</p>
                                                    </div>

                                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                        <div className="stockCounter d-inline">
                                                            <span 
                                                                className="btn btn-danger minus" 
                                                                onClick={() => decreaseQty(item.product, item.quantity )}
                                                            >-</span>
                                                            <input 
                                                                type="number" 
                                                                className="form-control count d-inline" 
                                                                value={item.quantity} readOnly 
                                                            />

                                                            <span 
                                                                className="btn btn-primary plus" 
                                                                onClick={() => increaseQty(item.product, item.quantity, item.stock )}
                                                            >+</span>
                                                        </div>
                                                    </div>

                                                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                        <i 
                                                            id="delete_cart_item" 
                                                            className="fa fa-trash btn btn-danger" 
                                                            onClick={() => removeItemCartHandler(item.product)}>
                                                            
                                                        </i>
                                                    </div>

                                                </div>
                                            </div>
                                            <hr />
                                        
                                        </Fragment>
                                    ))}
                                </div>

                                    <div className="col-12 col-lg-3 my-4">
                                        <div id="order_summary">
                                            <h4>Pedido</h4>
                                            <hr />
                                            <p>Produtos:  
                                                <span className="order-summary-values">
                                                    {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} 
                                                </span>
                                            </p>
                                            <p>Est. total: 
                                                <span className="order-summary-values">
                                                    R${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                                                </span>
                                            </p>
                            
                                            <hr />
                                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Comprar</button>
                                        </div>
                                    </div>
                                
                            </div>
                    </Fragment>
                    
                )}
        </Fragment>
    )
}

export default Cart
