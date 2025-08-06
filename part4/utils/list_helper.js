
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0) {
    return 0
  }

  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.toSorted((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
  const reducedObj = blogs.reduce((sum, blog) => {
    if(sum[blog.author]) {
      sum[blog.author].blogs += 1
    } else {
      sum[blog.author] = {
        author: blog.author,
        blogs: 1
      }
    }

    return sum
  }, {})

  return Object.values(reducedObj).toSorted((a, b) => b.blogs - a.blogs)[0]
}

const mostLikes = (blogs) => {
  const reducedObj = blogs.reduce((sum, blog) => {
    if(sum[blog.author]) {
      sum[blog.author].likes += blog.likes
    } else {
      sum[blog.author] = {
        author: blog.author,
        likes: blog.likes
      }
    }

    return sum
  }, {})

  return Object.values(reducedObj).toSorted((a, b) => b.likes - a.likes)[0]
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}