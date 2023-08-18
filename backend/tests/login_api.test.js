const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/users')


describe('Testing Logging in', () => {
  beforeEach( async () => {
    //clear database
    await User.deleteMany({})

    //hash the password using bcrypt
    const saltRounds = 10
    const password = 'testpw'
    const passwordHash = await bcrypt.hash(password, saltRounds)

    //create a new user and save to test db
    const user = new User({
      username: 'test',
      passwordHash,
      dateCreated: new Date()
    })

    await user.save()

    
  })

  test('Login with valid credentials', async () => {
    const login = {
      username: 'test',
      password: 'testpw'
    }

    const result = await api
      .post('/api/login')
      .send(login)
      .expect(200)

    expect(result.body.message).toEqual('Valid login.')
  })

  test('Login with wrong password or username', async () => {
    const login = {
      username: '',
      password: 'wrong'
    }

    await api
      .post('/api/login')
      .send(login)
      .expect(401)
  })
})


afterAll(async ()=> {
  //clear database
  await User.deleteMany({})
  await mongoose.connection.close()
})