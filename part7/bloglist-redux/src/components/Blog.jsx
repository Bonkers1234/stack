
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, user, handleLikes, handleDelete }) => {
  const [visible, setVisible] = useState(true)

  const canRemove = user.username === blog.user.username

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {visible
        ? (
          <div className='d-flex align-items-center'>
            <Link to={`/blogs/${blog.id}`} className='me-3'>
              {blog.title} - {blog.author}
            </Link>
            <Button variant='info' onClick={toggleVisibility}>view</Button>
          </div>)
        : (
          <div>
            <div>
              <div className='d-flex align-items-center'>
                <span className='me-3'>{blog.title} - {blog.author}</span>
                <Button variant='info' onClick={toggleVisibility}>hide</Button>
              </div>
            </div>
            <div className='mb-2'>
              <a href={`https://${blog.url}`}>{blog.url}</a>
            </div>
            <div className='d-flex align-items-center'>
              <span className='me-3'>likes {blog.likes}</span>
              <Button variant='success' onClick={() => handleLikes(blog)}>like</Button>
            </div>
            <div>
              {blog.user.name}
            </div>
            {canRemove && <Button className='my-1' variant='danger' onClick={() => handleDelete(blog)}>delete</Button>}
          </div>)}
    </div>
  )
}

export default Blog