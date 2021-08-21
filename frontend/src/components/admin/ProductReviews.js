import React, {Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import {
    getAdminReviews, 
    deleteReview,
    clearErrors
} from '../../actions/productActions'
import { DELETE_REVIEW_RESET  } from '../../constants/productConstants'



function ProductReviews({ history }) {

    const [productId, setProductId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch()

    const {  error, reviews } = useSelector(state => state.getReviewslReducer)
    const {  error: errorDelete, isDeleted } = useSelector(state => state.deleteReviewslReducer)
   
  

    useEffect(() => {

        if (productId !== '') {
            dispatch(getAdminReviews(productId))
        }
        
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if (isDeleted) {
            alert.success("Avaliação Deletada")
            history.push('/admin/reviews');
            dispatch({ type: DELETE_REVIEW_RESET })
        }
        
        if (errorDelete) {
            alert.error(errorDelete)
            dispatch(clearErrors())
        }
       
    }, [dispatch, alert, error, history, productId, isDeleted, errorDelete])

    const submitReviewHandler = (e) => {
        e.preventDefault();
        dispatch(getAdminReviews(productId))
    } 

    
    const deleteUserHandler = (id) => {
        
        if (window.confirm('Deseja excluir esta avaliação?')) {
            
            dispatch(deleteReview(productId, id))
        }
    }
    
    const setReviews = () => {
        const data = {
            columns : [
                {
                    label: 'Numero Avaliação',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Usuário',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Avaliação',
                    field: 'rating',
                    sort: 'asc'
                },

                {
                    label: 'Cometário',
                    field: 'comment',
                    sort: 'asc'
                },
                
                
                {
                    label: 'Ações',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        reviews.forEach( review => {
            data.rows.push({
                id: review._id,
                name: review.name,
                rating: review.rating,
                comment: review.comment,
                actions: 
                    <Fragment>
                        <button onClick={() =>  deleteUserHandler(review._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                    
            })
        })
        return data;
    }


    return (
        <Fragment>
            <MetaData title='Usuarios'/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitReviewHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        BUSCAR
								    </button>
                                </ form>
                            </div>

                        </div>

                            {reviews && reviews.length > 0 ? (
                                <MDBDataTable
                                    data={setReviews()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover 
                                />
                            ) : (
                                <p className="mt-5 text-center"> Sem Avaliação </p>
                            )}
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}


export default ProductReviews
