
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!body.title || !body.url) {
    return response.status(400).json({ error: 'missing Title or Url' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)
  if(blog.user.toString() !== user._id.toString()) {
    return response.status(400).json({ error: 'invalid user' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
  await user.save()
  await Blog.findByIdAndDelete(id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  // title, author and url can be discarded since mongoose updates only provided variable if it cant find others
  const { title, author, url, likes } = request.body

  if(!Number.isFinite(likes)) {
    return response.status(400).json({ error: 'likes is not a number' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { 
      title,
      author,
      url,
      likes
    },
    { new: true, runValidators: true }
  )

  if(!updatedBlog) {
    return response.status(404).end()
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter
