import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../actions/productAction'
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const dispatch = useDispatch();

    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);

    const addProduct = product => dispatch(createNewProduct(product));


    const submitProduct = e => {
        e.preventDefault();

        if (name.trim() === '' || price <= 0) {
            return;
        }

        addProduct({
            name,
            price
        });

        navigate('/');
    }


    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Add new product
                        </h2>

                        <form
                            onSubmit={submitProduct}
                        >
                            <div className='form-group'>
                                <label>Product Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Product Name'
                                    name='name'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Product Price</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Product price'
                                    name='price'
                                    value={price}
                                    onChange={e => setPrice(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >
                                Add
                            </button>
                        </form>

                        {loading ?
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            : null}

                        {error ?
                            <div className="alert alert-danger text-center font-weight-bold" role="alert">
                                Something went wrong...
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct