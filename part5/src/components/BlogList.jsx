
import Blog from './Blog'

const BlogList = ({ blogs, handleLikes }) => {

  return (
    <div>
      <h2>blogs</h2>
      {blogs.toSorted((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}
        />
      )}
    </div>
  )
}

export default BlogList