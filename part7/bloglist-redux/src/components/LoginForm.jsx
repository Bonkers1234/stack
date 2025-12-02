
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, logUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'


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
    <Container className='vh-100 d-flex align-items-center justify-content-center'>
      <Row className='w-100 justify-content-center'>
        <Col xs={12} md={6} lg={3}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <h2 className='text-center'>log in to application</h2>
              <Form.Label>username:</Form.Label>
              <Form.Control type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
              <Form.Label>password:</Form.Label>
              <Form.Control type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
              <Button className='my-2' variant='primary' type='submit'>login</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm