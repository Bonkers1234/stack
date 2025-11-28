
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
    },
    like(state, action) {
      return state.map(b => b.id === action.payload.id ? action.payload : b)
    },
    remove(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    comment(state, action) {
      return state.map(b => b.id === action.payload.id ? action.payload : b)
    }
  }
})

export const { set, add, like, remove, comment } = blogsSlice.actions

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

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      })

      dispatch(like(likedBlog))
      dispatch(setNotification(`You liked '${blog.title}'!`, 'info'))
    } catch(err) {
      dispatch(setNotification(err.response.data.error))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}'?`)) {
        await blogService.remove(blog.id)
        dispatch(remove(blog.id))
        dispatch(setNotification(`'${blog.title}' has been removed!`, 'info'))
      }
    } catch(err) {
      dispatch(setNotification(err.response.data.error))
    }
  }
}

// REMEMBER to name variables/reducerActions/functions distinctively to avoid problems with name collisions, 'blogComment' was previously
// named 'comment', same as dispatched reducerAction 'comment' which created a conflict and threw errors
export const commentBlog = (id, blogComment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(id, blogComment)
      dispatch(comment(updatedBlog))
      dispatch(setNotification('A new comment has been added!', 'info'))
    } catch(err) {
      dispatch(setNotification(err.response.data.error))
    }
  }
}

export default blogsSlice.reducer