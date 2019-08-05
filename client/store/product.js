import axios from 'axios'

//Action types
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SINGLE_PRODUCT = 'SINGLE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
//action creators

export const getProducts = data => ({
  type: GET_PRODUCTS,
  data
})

const singleProduct = product => ({
  type: SINGLE_PRODUCT,
  product
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const deleteProduct = (id, currentProductList) => ({
  type: DELETE_PRODUCT,
  id,
  currentProductList
})

const initialState = {
  productList: [],
  singleProduct: {}
}

//thunk

export const productsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const productThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(singleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const addProductThunk = product => {
  return async dispatch => {
    try {
      await axios.post('api/products', product)
      dispatch(addProduct(product))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteProductThunk = id => async (dispatch, getState) => {
  try {
    const {data} = await axios.put('/api/products/delete', {id})

    if (!data.error) {
      dispatch(getProducts(data))
    } else {
      dispatch(deleteProduct(id, getState().product.productList))
    }
  } catch (error) {
    console.error(error)
  }
}

//reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, productList: action.data}
    case SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case ADD_PRODUCT:
      return {...state, productList: [...state.productList, action.product]}

    case DELETE_PRODUCT:
      let firstIndex = action.currentProductList.indexOf(
        parseInt(action.id, 10)
      )
      return {
        ...state,
        productList: state.productList
          .slice(0, firstIndex)
          .concat(state.productList.slice(firstIndex + 1))
      }
    default:
      return state
  }
}
