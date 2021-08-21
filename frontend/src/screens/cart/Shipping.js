import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../components/layout/MetaData'
import {saveShippingInfo} from '../../actions/cartActions'
import CheckoutSteps from './CheckoutSteps'

function Shipping({history}) {
 
    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState('BRA')

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ 
            address,
            city,
            postalCode,
            phoneNo,
            country
        }))
        history.push('/order/confirm')
    }
    
    return (
        <Fragment>
            <MetaData title={'Endereço'} />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Endereço de Entrega</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Endereço</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">Cidade</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Telefone</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">CEP</label>
                            <input
                                type="text"
                                id="postal_code_field"
                                className="form-control"
                                required
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Pais</label>
                            <select
                                id="country_field"
                                className="form-control"
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                    <option>
                                        BRA
                                    </option>

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUAR
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

 export default Shipping
