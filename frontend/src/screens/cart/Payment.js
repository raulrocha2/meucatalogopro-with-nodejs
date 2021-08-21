import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../components/layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { 
    useStripe, 
    useElements, 
    CardNumberElement, 
    CardExpiryElement, 
    CardCvcElement
} from '@stripe/react-stripe-js'
import axios from 'axios'
import {createOrder, clearErrors} from '../../actions/orderActions'
import { CART_CLEAR_ITEMS } from '../../constants/cartConstants'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}
function Payment({ history }) {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.authReducer);
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.createOrderReducer);

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.totalPrice = orderInfo.totalPrice
    }
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault(); 

        document.querySelector('#pay_btn').disabled = true;

        let res;

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            if(!stripe || !elements) {
                return;
            }
            
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if(result.error) {
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {
                // the payment is processed or not
                if(result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    dispatch({type: CART_CLEAR_ITEMS})
                    history.push('/order/success')
                } else {
                    alert.error('Pagamento não processado corretamente ')
                }
            }
        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data)
            
        }
    }
    return (
        <Fragment>
            <MetaData title={'Pagamento'} />
            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Informações do cartão de credito</h1>
                        <div className="form-group">
                            <label for="card_num_field">Numero do cartão </label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label for="card_exp_field">Data de Expiração</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label for="card_cvc_field">Codigo CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>
            
                    
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pagar {` R$ ${orderInfo && orderInfo.totalPrice}`}
                        </button>
            
                    </form>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Payment
