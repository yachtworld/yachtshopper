import axios from 'axios'

//Action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CLEAR_CART = 'CLEAR_CART'
const DELETE_ITEM = 'DELETE_ITEM'

//action creators

const getCart = data => ({
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
    await axios.put(`/api/cart/add`, {id})
    dispatch(addToCart(id))
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

// export const clearCartThunk= () => async dispatch => {
//   try {
//     const newCart = await axios.post('/api/cart/delete', {id: productId})
//     if (!newCart.data.error) {
//       dispatch(getCart(newCart.data))
//     } else {
//       dispatch(deleteItem(productId))
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }
//reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.data
    case ADD_TO_CART:
      return state.concat(action.product)
    case CLEAR_CART:
      return []
    case DELETE_ITEM:
      let firstIndex = state.indexOf(action.productId)
      return state.slice(0, firstIndex).concat(state.slice(firstIndex + 1))
    default:
      return state
  }
}
