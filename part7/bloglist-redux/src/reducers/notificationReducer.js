
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return null
    }
  }
})

export const { set, clear } = notificationSlice.actions

export const setNotification = (text, type = 'error') => {
  return async dispatch => {
    dispatch(set({ text, type }))
    setTimeout(() => {
      dispatch(clear())
    }, 5000)
  }
}

export default notificationSlice.reducer