
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url) {
    return response.status(400).json({ error: 'missing Title or Url' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

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
