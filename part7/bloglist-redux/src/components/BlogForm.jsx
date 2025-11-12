
import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ blogs, setBlogs, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const clearFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const responseBlog = await blogService.create({
        title,
        author,
        url
      })

      setBlogs(blogs.concat(responseBlog))
      dispatch(setNotification(
        `A new blog '${responseBlog.title}' by '${responseBlog.author}' has been added!`,
        'info'
      ))
      blogFormRef.current.toggleVisibility()
      clearFields()
    } catch(err) {
      dispatch(setNotification(err.response.data.error))
      clearFields()
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <input
              type='text'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm