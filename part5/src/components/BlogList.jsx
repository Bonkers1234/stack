
import Blog from './Blog'

const BlogList = ({ blogs, user, handleLikes, handleDelete }) => {

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