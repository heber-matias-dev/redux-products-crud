import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { deleteProduct, editProductObtain } from '../actions/productAction';

const Product = ({ p }) => {
    const { name, price, id } = p;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteProductConfirm = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id));
            }
        })
    }

    const redirectEdit = product => {
        dispatch(editProductObtain(product));
        navigate(`/products/edit/${product.id}`)
    }

    return (
        <tr>
            <td>{name}</td>
            <td className='text-center'><span className='font-weight-bold'>${price}</span></td>
            <td className='d-flex justify-content-center'>
                <button
                    type='button'
                    onClick={() => redirectEdit(p)}
                    className='btn btn-primary mr-2'>
                    Edit
                </button>
                <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => deleteProductConfirm(id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default Product