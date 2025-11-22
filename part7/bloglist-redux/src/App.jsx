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
    <div className='container'>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <h2><strong>BlogApp</strong></h2>
          <p>
            {user.name} logged in{' '}
            <button onClick={() => handleLogOut()}>logout</button>
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
              <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <BlogForm
                  blogFormRef={blogFormRef}
                />
              </Togglable>}
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
