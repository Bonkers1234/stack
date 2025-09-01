
import './index.css'
import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const notifyWith = (text, type='error') => {
    setInfo({ text, type })
    setTimeout(() => {
      setInfo(null)
    }, 5000)
  }

  const handleLogOut = () => {
    localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    notifyWith(
      'Successfully logged out',
      'info'
    )
  }

  return (
    <div>
      <Notification info={info} />
      {!user && <LoginForm setUser={setUser} notifyWith={notifyWith} />}
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={() => handleLogOut()}>logout</button>
          </p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef} >
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              notifyWith={notifyWith}
              blogFormRef={blogFormRef}
            />
          </Togglable>
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App