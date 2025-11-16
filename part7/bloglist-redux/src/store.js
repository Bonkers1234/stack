
import { configureStore } from '@reduxjs/toolkit'
import noficationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: noficationReducer,
    blogs: blogsReducer,
    user: userReducer
  }
})

export default store