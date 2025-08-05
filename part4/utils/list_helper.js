
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


module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}