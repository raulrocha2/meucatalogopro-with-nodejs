import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import {
    getAdminProducts, 
    clearErrors,
    deleteProduct
} from '../../actions/productActions'
import { DELETE_PRODUCT_RESET  } from '../../constants/productConstants'



function ProductList({ history }) {

    const alert = useAlert();
    const dispatch = useDispatch()

    const { loading, error, products } = useSelector(state => state.productsReducer)
    const { error: errorDelete, isDeleted } = useSelector(state => state.productReducer)

    useEffect(() => {

        dispatch(getAdminProducts())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Produto Deletado")
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        
        if (errorDelete) {
            alert.error(errorDelete)
            dispatch(clearErrors())
        }
       
    }, [dispatch, alert, error, errorDelete, isDeleted, history])

    const deleteProductHandler = (id) => {
        
        if (window.confirm('Deseja excluir este produto?')) {
            
            dispatch(deleteProduct(id))
        }
    }

    const setProducts = () => {
        const data = {
            columns : [
                {
                    label: 'Numero do Produto',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Nome',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Marca',
                    field: 'brand',
                    sort: 'asc'
                },
                {
                    label: 'Preço',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Estoque',
                    field: 'stock',
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

        products.forEach( product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                brand: product.brand,
                price: product.price.toFixed(2),
                stock: product.stock,
                actions: 
                    <Fragment>
                        <Link 
                            to={`/admin/product/update/${product._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>

                        <button onClick={() => deleteProductHandler(product._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                    
            })
        })
        return data;
    }


    return (
        <Fragment>
            <MetaData title='Produtos'/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Meus Produtos</h1>

                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setProducts()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover 
                                />
                            )}
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}

export default ProductList
