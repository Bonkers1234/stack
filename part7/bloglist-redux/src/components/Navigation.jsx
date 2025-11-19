
import { Link } from 'react-router-dom'

const Navigation = () => {

  const padding = {
    paddingRight: 5,
    textDecoration: 'none',
    margin: '0px 15px'
  }

  return (
    <div>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
    </div>
  )
}

export default Navigation