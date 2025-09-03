
const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  if(!body.title || !body.url) {
    return response.status(400).json({ error: 'missing Title or Url' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user._id
  })

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)
  if(blog.user.toString() !== request.user._id.toString()) {
    return response.status(400).json({ error: 'invalid user' })
  }

  request.user.blogs = request.user.blogs.filter(b => b.toString() !== blog._id.toString())
  await request.user.save()
  await Blog.findByIdAndDelete(id)

  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  // title, author and url can be discarded since mongoose updates only provided variable if it cant find others
  const { title, author, url, likes, user } = request.body

  if(!Number.isFinite(likes)) {
    return response.status(400).json({ error: 'likes is not a number' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { 
      title,
      author,
      url,
      likes,
      user
    },
    { new: true, runValidators: true }
  )

  if(!updatedBlog) {
    return response.status(404).end()
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter
