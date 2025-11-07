
import { useState } from 'react'

const Blog = ({ blog, user, handleLikes, handleDelete }) => {
  const [visible, setVisible] = useState(true)

  const canRemove = user.username === blog.user.username

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {visible
        ? (
          <div>
            {blog.title} - {blog.author} <button onClick={toggleVisibility}>view</button>
          </div>)
        : (
          <div>
            <div>
              {blog.title} - {blog.author} <button onClick={toggleVisibility}>hide</button>
            </div>
            <div>
              {blog.url}
            </div>
            <div>
              likes {blog.likes} <button onClick={() => handleLikes(blog)}>like</button>
            </div>
            <div>
              {blog.user.name}
            </div>
            {canRemove && <button onClick={() => handleDelete(blog)}>delete</button>}
          </div>)}
    </div>
  )
}

export default Blog