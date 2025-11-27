import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const BlogDetail = ({ user, handleLikes, handleDelete }) => {
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find(b => b.id === id))

  if(!user || !blog) {
    return null
  }

  const canRemove = user.username === blog.user.username

  return (
    <div>
      <div>
        <h2>{blog.title} - by {blog.author}</h2>
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
      </div>
      <div>
        <h3>Comments:</h3>
        {blog.comments && <ul>
          {blog.comments.map(c => <li>{c}</li>)}
        </ul>}
      </div>
    </div>
  )
}

export default BlogDetail