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
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from '../types'

// Every reducer has their own state

const initialState = {
    list: [],
    error: false || null,
    loading: false,
    deleteProduct: null,
    editProduct: null
};

const productsReducer = function (state = initialState, action) {
    switch (action.type) {
        case DOWNLOAD_PRODUCTS_START:
        case ADD_PRODUCT:
        case DELETE_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload]
            }
        case DOWNLOAD_PRODUCTS_ERROR:
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DOWNLOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                list: action.payload
            }
        case DELETE_PRODUCT_OBTAIN:
            return {
                ...state,
                deleteProduct: action.payload
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                list: state.list.filter(product => product.id !== state.deleteProduct),
                deleteProduct: null
            }
        case EDIT_PRODUCT_OBTAIN:
            return {
                ...state,
                editProduct: action.payload
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                editProduct: null,
                list: state.list.map(product => product.id === action.payload.id ? product = action.payload : product)
            }
        default:
            return state
    }
}

export default productsReducer;