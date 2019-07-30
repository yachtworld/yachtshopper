import axios from 'axios'

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

const initialState = []

//thunk

export const getCartThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    if (data.length === 0) {
      return
    }
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
      return action.data
    case ADD_TO_CART:
      return state.concat(action.product)
    default:
      return state
  }
}
