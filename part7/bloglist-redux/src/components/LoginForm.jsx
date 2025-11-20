
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, logUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  },[dispatch])

  const handleSubmit = async (event) => {
    event.preventDefault()

    dispatch(logUser({ username, password }))
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>log in to application</h2>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm