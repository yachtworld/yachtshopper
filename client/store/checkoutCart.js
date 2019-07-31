import axios from 'axios'

//Action types
const GET_CHECKOUT = 'GET_CHECKOUT'

//action creators

const getCheckout = data => ({
  type: GET_CHECKOUT,
  data
})

const initialState = []

//thunk

export const checkoutThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
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
    case GET_CHECKOUT:
      return action.data
    default:
      return state
  }
}
