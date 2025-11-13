import './index.css'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import { setBackendBlogs } from './reducers/blogsReducer'

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(setBackendBlogs())
  }, [dispatch])

  const handleLikes = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      })

      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
      dispatch(setNotification(`You liked '${blog.title}'!`, 'info'))
    } catch (err) {
      dispatch(setNotification(err.response.data.error))
    }
  }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}'?`)) {
        await blogService.remove(blog.id)
      }
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      dispatch(setNotification(`'${blog.title}' has been removed!`, 'info'))
    } catch (err) {
      dispatch(setNotification(err.response.data.error))
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch(setNotification('Successfully logged out', 'info'))
  }

  return (
    <div>
      <Notification />
      {!user && <LoginForm setUser={setUser} />}
      {user && (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={() => handleLogOut()}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              blogFormRef={blogFormRef}
            />
          </Togglable>
          <BlogList
            blogs={blogs}
            user={user}
            handleLikes={handleLikes}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  )
}

export default App
