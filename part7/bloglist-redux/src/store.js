
import { configureStore } from '@reduxjs/toolkit'
import noficationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: noficationReducer
  }
})

export default store