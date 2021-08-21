import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap'
import MetaData from '../../components/layout/MetaData'
import Loader from '../../components/layout/Loader'
import { useAlert } from 'react-alert'
import ListReviews from '../../components/review/ListReviews'
import {productDetail, createReview, clearErrors} from '../../actions/productActions'
import {addItemToCart} from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'


function Detail({match}) {

    const [ quantity, setQuantity ] = useState(1);
    const [ comment, setComment ] = useState('');
    const [ rating, setRating ] = useState(1);

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, product, error  } = useSelector(state => state.productDetailReducer)
    const { user } = useSelector(state => state.authReducer)
    const { error : errorReview, success  } = useSelector(state => state.newReviewReducer)

    useEffect(() => {

        dispatch(productDetail(match.params.id));
        
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (errorReview) {
            alert.error('Falha ao enviar avaliação')
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Avaliação enviada com sucesso')
            dispatch({type: NEW_REVIEW_RESET})
        
        }

    }, [dispatch, match.params.id, alert, error, success, errorReview])
    
    
    const addToCart = () => {

        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Item adicionado ');
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')
        
        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const submitHandlerReview = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);
        console.log(formData);
        dispatch(createReview(formData));
    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star')

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type ==='click') {
                    if (index < this.starValue) {

                        star.classList.add('orange');
                        setRating(this.starValue)
                    } else {

                        star.classList.remove('orage')
                    }
                }
                if (e.type ==='mouseover') {

                    if (index < this.starValue) {

                        star.classList.add('yellow');
                    } else {

                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    return (

        <Fragment>
            <MetaData title={product.name} />
        {loading ? <Loader />
            : (
            <Fragment>
                <div className="container container-fluid">
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause="hover">
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Produto # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" 
                                    style={{ width: `${(product.ratings / 5) * 100}%` }}>

                                </div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">R${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button 
                                type="button" 
                                id="cart_btn" 
                                className="btn btn-primary d-inline ml-4"
                                disabled={product.stock === 0 ? true : false}
                                onClick={addToCart}
                                
                            >
                                Adicionar
                            </button>

                            <hr />
                            <p>Status: 
                                <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} 
                                    >{product.stock > 0 ? 'Disponivel' : 'Indisponivel'}
                                </span>
                            </p>
                            
                            <hr />
                            
                            <h4 className="mt-2">Descrição:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Vendido por: <strong>{product.brand}</strong></p>
                            {user ? <button 
                                        id="review_btn" 
                                        type="button" 
                                        className="btn btn-primary mt-4" 
                                        data-toggle="modal" 
                                        data-target="#ratingModal"
                                        onClick={setUserRatings}
                                        >
                                        Enviar Avaliação
                                    </button>
                            : 
                                <div className="alert alert-danger mt-5" type="alert">
                                    Faça o login para enviar sua Avaliação
                                </div>
                            }
                          
                            
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div 
                                        className="modal fade" 
                                        id="ratingModal" 
                                        tabIndex="-1" 
                                        role="dialog" 
                                        aria-labelledby="ratingModalLabel" 
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Enviar Avaliação</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea 
                                                        name="review" 
                                                        id="review" 
                                                        className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button 
                                                        className="btn my-3 float-right review-btn px-4 text-white" 
                                                        data-dismiss="modal" 
                                                        aria-label="Close"
                                                        onClick={submitHandlerReview}
                                                    >
                                                        Enviar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>         
                        </div>
                    </div>
                </div>
                {product.reviews && product.reviews.length > 0  && (
                    <ListReviews reviews={product.reviews} />
                )}
            </Fragment>
        )}
    </Fragment>
    )
}

export default Detail
