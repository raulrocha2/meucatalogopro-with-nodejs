import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {MDBDataTable} from 'mdbreact'
import Loader from '../../components/layout/Loader'
import MetaData from '../../components/layout/MetaData'
import { useAlert } from 'react-alert'
import {myOrders, clearErrors} from '../../actions/orderActions'



function MyOrders() {

    const alert = useAlert()
    const dispatch = useDispatch()


    const { loading, error, orders} = useSelector(state => state.myOrdersReducer)

    
    useEffect(() => {

        dispatch(myOrders())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'Numero do Pedido',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Numero dos Itens ',
                    field: 'numOfItems',
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
                numOfItems: order.orderItems.length,
                amount: `R$${order.totalPrice.toFixed(2)}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') 
                    ? <p style={{ color: 'green'}}>{order.orderStatus}</p>
                    : <p style={{ color: 'red'}}>{order.orderStatus}</p>,
                actions: 
                    <Link 
                        to={`/order/detail/${order._id}`}
                        className="btn btn-primary"
                    >
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })
        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Meus Pedidos'} />
            
            <h1 className="my-5">Meus Pedidos</h1>

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
    )
}

export default MyOrders
