
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    },
    add(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { set, add } = blogsSlice.actions

export const setBackendBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(add(newBlog))
      dispatch(setNotification(
        `A new blog '${newBlog.title}' by '${newBlog.author}' has been added!`,
        'info'
      ))
    } catch(err) {
      dispatch(setNotification(err.response.data.error))
    }
  }
}

export default blogsSlice.reducer