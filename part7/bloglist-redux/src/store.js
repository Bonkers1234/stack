
import { configureStore } from '@reduxjs/toolkit'
import noficationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    notification: noficationReducer,
    blogs: blogsReducer
  }
})

export default store