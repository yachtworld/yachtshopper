import axios from 'axios'

//Action types
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

//action creators

export const getProducts = data => ({
  type: GET_PRODUCTS,
  data
})

const singleProduct = product => ({
  type: SINGLE_PRODUCT,
  product
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

//reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, productList: action.data}
    case SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}
