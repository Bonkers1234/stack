
import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const { set } = usersReducer.actions

export const setUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(set(users))
  }
}

export default usersReducer.reducer