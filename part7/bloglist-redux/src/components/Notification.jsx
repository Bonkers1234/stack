
import { useSelector } from 'react-redux'

const Notification = () => {
  const info = useSelector(({ notification }) => notification)

  if (!info) return null

  return <div className={info.type}>{info.text}</div>
}

export default Notification
