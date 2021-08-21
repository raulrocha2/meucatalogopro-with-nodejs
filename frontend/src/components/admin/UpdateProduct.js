import React, {Fragment, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import {
    updateProduct, 
    productDetail, 
    clearErrors
} from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'




function UpdateProduct({ history, match }) {

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])


    const alert = useAlert()

    const { product, error  } = useSelector(state => state.productDetailReducer)
    const { error: errorUpdate, loading, isUpdated } = useSelector(state => state.productReducer)


    const productId = match.params.id;

    const dispatch = useDispatch()

    useEffect(() => {

        if (product && product._id !== productId ) {
            dispatch(productDetail(productId))
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setBrand(product.brand);
            setSeller(product.seller);
            setStock(product.stock);
            setOldImages(product.images);
           
        }

        if (errorUpdate) {
            alert.error(errorUpdate)
            dispatch(clearErrors());
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }

        if (isUpdated) {
            history.push('/admin/products')
            alert.success('Produto atualizado com sucesso');
            dispatch({ type: UPDATE_PRODUCT_RESET})
        }
    }, [dispatch, errorUpdate, alert, history, isUpdated, product, productId, error])


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

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('brand', brand);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        images.forEach(image => {
            formData.append('images', image)
        })
        
        dispatch(updateProduct(product._id, formData))
    }

    const onChange = (e) => {

        const files = Array.from(e.target.files)

        setImagesPreview([])
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
          
            reader.readAsDataURL(file)
        })

    }

    return (
        <Fragment>
            <MetaData title='Atualizar Produto' />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5"> 
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Atualizar Produto</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nome</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Preço</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Descrição</label>
                                        <textarea 
                                            className="form-control" 
                                            id="description_field" 
                                            rows="8" 

                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Fabricante</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoria</label>
                                    <select 
                                        className="form-control" 
                                        id="category_field"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map(category => (
                                            <option
                                                key={category}
                                                value={category} 
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Estoque</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Vendedor</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        required
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    
                                    />
                                </div>
                                
                                <div className='form-group'>
                                    <label>Imagens</label>
                                    
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='product_images'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={onChange}
                                                multiple
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                add imagens
                                            </label>
                                        </div>

                                        {oldImages && oldImages.map(img => (
                                            <img 
                                                src={img.url} 
                                                key={img} 
                                                alt={img.url} 
                                                className="mt-3 mr-2"
                                                width="55"
                                                height="52" 
                                            />
                                        ))}

                                        {imagesPreview.map(img => (
                                            <img 
                                                src={img} 
                                                key={img} 
                                                alt="images Preview" 
                                                className="mt-3 mr-2"
                                                width="55"
                                                height="52" 
                                            />
                                        ))}
                                </div>

                    
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    Salvar
                                </button>

                            </form>
                        </div>  
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}

export default UpdateProduct
