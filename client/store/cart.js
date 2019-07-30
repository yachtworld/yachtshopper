import axios from 'axios'

//Action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

//action creators

const getCart = data => ({
  type: GET_CART,
  data
})

const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

const initialState = {
  cart: []
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
