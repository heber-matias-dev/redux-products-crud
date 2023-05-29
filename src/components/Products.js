import React, { useEffect } from 'react'
import Product from './Product';

import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productAction';

const Products = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = () => dispatch(getProducts());
    loadProducts();
  }, [dispatch])

  const products = useSelector(state => state.products.list);
  const error = useSelector(state => state.products.error);
  const loading = useSelector(state => state.products.loading);

  return (
    <>
      <h2 className='text-center my-5 '>Products List</h2>
      {error ? <p className='font-weight-bold alert alert-danger text-center mt-4'>Something went wrong</p> : null}
      {loading ?
        <div className='w-100 d-flex justify-content-center mb-5'>
          <div className=" spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        :
        null
      }
      <table className='table table-striped'>
        <thead className='bg-primary table-dark'>
          <tr>
            <th className='text-center' scope='col'>Name</th>
            <th className='text-center' scope='col'>Price</th>
            <th className='text-center' scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? 'There are no products' : (
            products.map(p => (
              <Product
                key={p.id}
                p={p}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  )
}

export default Products