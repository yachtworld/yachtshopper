import axios from 'axios'

//Action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const GET_CHECKOUT = 'GET_CHECKOUT'

//action creators

export const getCart = data => ({
  type: GET_CART,
  data
})

const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

const deleteItem = productId => ({
  type: DELETE_ITEM,
  productId
})

export const clearCart = () => ({
  type: CLEAR_CART
})

const getCheckout = data => ({
  type: GET_CHECKOUT,
  data
})

const initialState = {
  cart: [],
  checkout: []
}

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
    await axios.put(`/api/cart/add`, {id})
    dispatch(addToCart(parseInt(id, 10)))
  } catch (error) {
    console.error(error)
  }
}

export const deleteItemThunk = productId => async dispatch => {
  try {
    const newCart = await axios.put('/api/cart/delete', {id: productId})
    if (!newCart.data.error) {
      dispatch(getCart(newCart.data))
    } else {
      dispatch(deleteItem(productId))
    }
  } catch (error) {
    console.error(error)
  }
}

export const checkoutThunk = () => async (dispatch, getState) => {
  try {
    let data = getState().cart.checkout
    await axios.put(`/api/cart/checkout`, {data})
    if (data.length === 0) {
      return
    }
    dispatch(getCheckout(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.data}
    case ADD_TO_CART:
      return {...state, cart: state.cart.concat(action.product)}
    case CLEAR_CART:
      return {...state, checkout: state.cart, cart: []}
    case DELETE_ITEM:
      let firstIndex = state.cart.indexOf(action.productId)
      return {
        ...state,
        cart: state.cart
          .slice(0, firstIndex)
          .concat(state.cart.slice(firstIndex + 1))
      }
    case GET_CHECKOUT:
      return {...state, checkout: action.data}
    default:
      return state
  }
}
