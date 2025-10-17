
import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext)
  return valueAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext)
  return valueAndDispatch[1]
}

export const useNotify = () => {
  const valueAndDispatch = useContext(NotificationContext)
  const dispatch = valueAndDispatch[1]
  return (payload) => {
    dispatch({ type: 'SET', payload })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 5000)
  }
}

export default NotificationContext