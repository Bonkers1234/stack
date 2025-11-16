import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    reset(state, action) {
      return null
    }
  }
})

export const { set, reset } = userSlice.actions

export const logUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(set(user))
      dispatch(setNotification(
        'Successfully logged in!',
        'info'
      ))
    } catch(err) {
      dispatch(setNotification(err.response.data.error))
    }
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch(set(user))
  }
}

export const logOutUser = () => {
  return async dispatch  => {
    localStorage.removeItem('loggedBlogappUser')
    dispatch(reset())
    dispatch(setNotification('Successfully logged out', 'info'))
  }
}

export default userSlice.reducer