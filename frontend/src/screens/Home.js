/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../components/layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "react-js-pagination"
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'
import Product from '../screens/products/Product'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import { useAlert } from 'react-alert'
import {getProducts} from '../actions/productActions'


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)


function Home({ match }) {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 100000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Eletrônicos',
        'Celulares',
        'Cameras',
        'Notebooks',
        'Acessórios ',
        'Headphones',
        'Comida',
        "Livros",
        'Roupas/Calçados',
        'Saude/Beleza',
        'Esportes',
        'Exterior',
        'Casa',
        'Outros'
    ]

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, products, error, productsCount, resPerPage, filteredProductionsCount } = useSelector(state => state.productsReducer)

    const keyword = match.params.keyword

    useEffect(() => {
   
        dispatch(getProducts(keyword, currentPage, price, category, rating));
        

    }, [dispatch, keyword, currentPage, price, category, rating])
    
    function setCurrentPageNow(pageNumber) {
        setCurrentPage(pageNumber)
    }
    let count = productsCount;
    if (keyword) {
        let count = filteredProductionsCount;
    }

    return (
        <Fragment>
            {loading ? <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Fragment>
                        <MetaData title={'Home'} />
                        
                        <section id="products" className="container mt-5">
                            <div className="row">
                                {keyword ? (
                                    <Fragment>
                                        <div className="col-6 col-md-3 mt-5 mb-5">
                                            <div className="px-5">
                                                <Range 
                                                    marks={{
                                                        1: `$1`,
                                                        10000:`$10000`
                                                    }}
                                                    min={1}
                                                    max={10000}
                                                    defaultValue={[1, 10000]}
                                                    tipFormatter={value => `${value}`}
                                                    tipProps={{
                                                        placement: "top",
                                                        visible: true
                                                    }}
                                                    value={price}
                                                    onChange={price => setPrice(price)}
                                                />

                                                <hr className="my-5" />
                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Categorias
                                                    </h4>
                                                    <ul className="pl-0">
                                                        {categories.map(category => (
                                                            <li
                                                                style={{cursor: 'pointer',
                                                                        listStyleType: 'none'
                                                                }}
                                                                key={category}
                                                                onClick={() => setCategory(category)}
                                                            >
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <hr className="my-3" />

                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Avaliações
                                                    </h4>
                                                    <ul className="pl-0">
                                                        {[5, 4, 3, 2, 1].map(star => (
                                                            <li
                                                                style={{cursor: 'pointer',
                                                                        listStyleType: 'none'
                                                                }}
                                                                key={star}
                                                                onClick={() => setRating(star)}
                                                            >
                                                                <div className="rating-outer">
                                                                    <div className="rating-inner" 
                                                                        style={{
                                                                            width: `${star * 20}%`
                                                                        }}
                                                                    >

                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {products.map(product => (
                                                    <Product  key={product._id} product={product} col={4}/>
                                                ))}
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : (

                                    products.map(product => (
                                        <Product  key={product._id} product={product} col={3}/>
                                    ))
                                )}
                                
                            </div>
                            
                        </section>

                        {resPerPage <= count && (
                            <div className="d-flex justify-content-center mt-5">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNow}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </Fragment>
            }
            
        </Fragment>
    )
}

export default Home
