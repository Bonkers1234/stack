
import { Link } from 'react-router-dom'

const Navigation = () => {

  const padding = {
    paddingRight: 5,
    textDecoration: 'none',
    margin: '0px 15px'
  }

  const background = {
    backgroundColor: 'papayawhip',
    borderRadius: '5px'
  }

  return (
    <div style={background}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <Link style={padding} to='/create'>create</Link>
    </div>
  )
}

export default Navigation