import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    DOWNLOAD_PRODUCTS_START,
    DOWNLOAD_PRODUCTS_SUCCESS,
    DOWNLOAD_PRODUCTS_ERROR,
    DELETE_PRODUCT_OBTAIN,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    EDIT_PRODUCT_OBTAIN,
    EDIT_PRODUCT_BEGIN,
    EDIT_PRODUCT_SUCCESS,
} from '../types'

import axiosClient from '../config/axios';
import Swal from 'sweetalert2';


export function createNewProduct(product) {
    return async (dispatch) => {
        dispatch(addProduct())
        try {
            await axiosClient.post('/products', product)
            dispatch(addProductSuccess(product));
            Swal.fire(
                'Success',
                'Product added',
                'success'
            )
        } catch (error) {
            dispatch(addProductError(true));
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong'
            })
        }
    }
};

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
});

const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
});

const addProductError = state => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
})

export function getProducts() {
    return async (dispatch) => {
        dispatch(downloadProducts())
        try {
            const response = await axiosClient.get('/products');
            dispatch(downloadProductsSuccess(response.data));
        } catch (error) {
            dispatch(downloadProductsError());
        }
    }
}

const downloadProducts = () => ({
    type: DOWNLOAD_PRODUCTS_START,
    payload: true
})

const downloadProductsSuccess = products => ({
    type: DOWNLOAD_PRODUCTS_SUCCESS,
    payload: products
})

const downloadProductsError = () => ({
    type: DOWNLOAD_PRODUCTS_ERROR,
    payload: true
})


export function deleteProduct(id) {
    return async (dispatch) => {
        dispatch(deleteProductObtain(id))
        try {
            await axiosClient.delete(`/products/${id}`);
            dispatch(deleteProductSuccess());

            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(deleteProductError())
        }
    }
}

const deleteProductObtain = id => ({
    type: DELETE_PRODUCT_OBTAIN,
    payload: id
});

const deleteProductSuccess = id => ({
    type: DELETE_PRODUCT_SUCCESS,
})

const deleteProductError = id => ({
    type: DELETE_PRODUCT_ERROR,
    payload: true
})

export function editProductObtain(product) {
    return (dispatch) => dispatch(obtainProductAction(product));
}

const obtainProductAction = product => ({
    type: EDIT_PRODUCT_OBTAIN,
    payload: product
})

export function editProductAction(product) {
    return async (dispatch) => {
        dispatch(editProduct(product))

        try {
            await axiosClient.put(`/products/${product.id}`, product);
            dispatch(editProductSuccess(product));
        } catch (error) {
            console.log(error);
        }
    }
}

const editProduct = () => ({
    type: EDIT_PRODUCT_BEGIN
})

const editProductSuccess = product => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
})