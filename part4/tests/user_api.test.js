
const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('When creating users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10)

    const newUser = new User({
      username: helper.initialUsers[0].username,
      name: helper.initialUsers[0].name,
      passwordHash
    })

    await newUser.save()
  })

  describe('new user cant be created if', () => {
    test('username is too short', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const user = {
        username: 'Bi',
        name: 'Bill',
        password: 'password'
      }
  
      await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  
      const usernames = usersAtEnd.map(user => user.username)
      assert(!usernames.includes(user.username))
    })

    test('username is missing', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const user = {
        name: 'Bill',
        password: 'password'
      }
  
      await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  
      const usernames = usersAtEnd.map(user => user.username)
      assert(!usernames.includes(user.username))
    })

    test('username is already in database', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const user = {
        username: helper.initialUsers[0].username,
        name: 'Bill',
        password: 'password'
      }
  
      await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  
      const usernames = usersAtEnd.filter(user => user.username === helper.initialUsers[0].username)
      assert.strictEqual(usernames.length, 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})