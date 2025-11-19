
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user, handleLikes, handleDelete }) => {
  const blogs = useSelector(({ blogs }) => blogs)

  return (
    <div>
      <h2>blogs</h2>
      {blogs.toSorted((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLikes={handleLikes}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default BlogList