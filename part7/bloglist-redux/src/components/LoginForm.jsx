
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, logUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


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
    <Form onSubmit={handleSubmit}>
      <h2>log in to application</h2>
      <Form.Group className='w-25'>
        <Form.Label>username:</Form.Label>
        <Form.Control type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
        <Form.Label>password:</Form.Label>
        <Form.Control type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        <Button className='my-2' variant='primary' type='submit'>login</Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm