
const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')

const api = supertest(app)

const getToken = async () => {
  const request = await api
    .post('/api/login')
    .send({
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password
    })

    return `Bearer ${request.body.token}`
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  await api
    .post('/api/users')
    .send(helper.initialUsers[0])
})


test('correct number of blogs in JSON format is returned', async () => {
  const returnedBlogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(returnedBlogs.body.length, helper.initialBlogs.length)
})

test('database returned blog has id property', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].id)
})

test('successfully creates new blog', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: "TEST",
    author: "Robert",
    url: "http://blog.com",
    likes: 2,
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', await getToken())
    .send(newBlog)
    .expect(201)

  const blogTitle = response.body.title
  assert.strictEqual(blogTitle, newBlog.title)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
})

test('fails to create a blog with code 401 if token is missing', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const newBlog = {
    title: "TEST",
    author: "Robert",
    url: "http://blog.com",
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(newBlog.title))
})

test('missing likes default to 0', async () => {
  const newBlog = {
    title: "TEST",
    author: "Robert",
    url: "http://blog.com"
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', await getToken())
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('missing Title or Url default to 400', async () => {
  const newBlog = {
    author: "Robert",
    url: "http://blog.com"
  }
  
  await api
    .post('/api/blogs')
    .set('Authorization', await getToken())
    .send(newBlog)
    .expect(400)
})

test('deleting a blog succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  // const blogToDelete = blogsAtStart[0]
  const blogToDelete = await api
    .post('/api/blogs')
    .set('Authorization', await getToken())
    .send({
      title: 'DELETE ME',
      author: 'DELETE ME',
      url: 'DELETE ME'
    })
    .expect(201)

  const blogsBeforeDelete = await helper.blogsInDb()
  assert.strictEqual(blogsAtStart.length + 1, blogsBeforeDelete.length)

  await api
    .delete(`/api/blogs/${blogToDelete.body.id}`)
    .set('Authorization', await getToken())
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.body.title))

  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

test('correctly updates a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: 10
  }

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(updatedBlog.body.likes, newBlog.likes)
})


after(async () => {
  await mongoose.connection.close()
})
