import axios from 'axios'

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'

const userList = []

const getUsers = data => ({type: GET_USERS, data})
const deleteUser = (id, currentUserList) => ({
  type: DELETE_USER,
  id,
  currentUserList
})

export const usersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(getUsers(data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteUserThunk = id => async (dispatch, getState) => {
  try {
    const {data} = await axios.put('api/users/delete', {id})

    if (!data.error) {
      dispatch(getUsers(data))
    } else {
      dispatch(deleteUser(id, getState()))
    }
  } catch (error) {
    console.error(error)
  }
}

export default function(state = userList, action) {
  switch (action.type) {
    case GET_USERS:
      return action.data
    case DELETE_USER:
      let firstIndex = action.currentUserList.indexOf(parseInt(action.id, 10))
      return state.slice(0, firstIndex).concat(state.slice(firstIndex + 1))
    default:
      return state
  }
}
