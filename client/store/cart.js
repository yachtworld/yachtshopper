import axios from 'axios'
import getUser from './user'

//Action types
const GET_CART = 'GET_CART'
export const ADD_TO_CART = 'ADD_TO_CART'

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

export const getCartThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const addToCartThunk = id => async dispatch => {
  try {
    await axios.put(`/api/cart`, {id})
    dispatch(addToCart(id))
  } catch (error) {
    console.error(error)
  }
}

//reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.data}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.product]}
    default:
      return state
  }
}
