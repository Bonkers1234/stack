import './index.css'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { likeBlog, removeBlog, setBackendBlogs } from './reducers/blogsReducer'
import { logOutUser } from './reducers/userReducer'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Users from './components/Users'
import User from './components/User'
import BlogDetail from './components/BlogDetail'
import { Container, Row, Col, Button } from 'react-bootstrap'

const App = () => {
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(setBackendBlogs())
  }, [dispatch])

  const handleLikes = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (blog) => {
    dispatch(removeBlog(blog))
    navigate('/')
  }

  const handleLogOut = () => {
    dispatch(logOutUser())
  }

  return (
    <Container className='my-5 pt-5'>
      <Row>
        <Col>
          <Notification />
          {!user && <LoginForm />}
          {user && (
            <div>
              <h2><strong>BlogApp</strong></h2>
              <p>
                {user.name} logged in{' '}
                <Button variant='primary' onClick={() => handleLogOut()}>logout</Button>
              </p>
              <Navigation />
              <Routes>
                <Route path='/' element={
                  <BlogList
                    user={user}
                    handleLikes={handleLikes}
                    handleDelete={handleDelete}
                  />}
                />
                <Route path='/blogs' element={
                  <BlogList
                    user={user}
                    handleLikes={handleLikes}
                    handleDelete={handleDelete}
                  />}
                />
                <Route path='/blogs/:id' element={
                  <BlogDetail
                    user={user}
                    handleLikes={handleLikes}
                    handleDelete={handleDelete}
                  />}
                />
                <Route path='/users/:id' element={<User />} />
                <Route path='/users' element={<Users />} />
                <Route path='/create' element={
                  <Container>
                    <Row>
                      <Col xs={12} md={6} lg={4}>
                        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                          <BlogForm
                            blogFormRef={blogFormRef}
                          />
                        </Togglable>
                      </Col>
                    </Row>
                  </Container>}
                />
              </Routes>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default App
