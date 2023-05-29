import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editProductAction } from '../actions/productAction';

const EditProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: 0
  })

  const productToEdit = useSelector(state => state.products.editProduct);

  useEffect(() => {
    setProduct(productToEdit);
  }, [productToEdit])

  const captureFormChanges = e => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }


  if (!product) return
  const { name, price } = product;

  const submitEdition = (e) => {
    e.preventDefault();
    console.log(product);
    dispatch(editProductAction(product));
    navigate('/');
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Edit product
            </h2>

            <form onSubmit={submitEdition}>
              <div className='form-group'>
                <label>Product Name</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Product Name'
                  name='name'
                  value={name}
                  onChange={captureFormChanges}
                />
              </div>
              <div className='form-group'>
                <label>Product Price</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Product price'
                  name='price'
                  min='1'
                  value={Number(price)}
                  onChange={captureFormChanges}
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct