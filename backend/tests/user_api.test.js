const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/users')

//POST route test
describe('POST routes for User database, one user in DB initially', () => {
  //Clear User test database
  beforeEach(async () => {
    await User.deleteMany({})

    //For test purposes, skipping bcrypt hash for now and add 1 user to db
    const user = new User({ username: 'test', passwordHash: 'testpw' })

    await user.save()
  })

  //Test adding user to database
  test('Successfully adding a new user to db', async () => {
    //set variable for original users
    const originalUsers = await User.find({})

    const user = {
      username: 'test2',
      password: 'testpw2',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    //variable for new users
    const newUsers = await User.find({})

    //check if database size increased by 1
    expect(newUsers).toHaveLength(originalUsers.length + 1)
    
    const allUsernames = newUsers.map(u => u.username)

    expect(allUsernames).toContain(user.username)
  })

  // Test if missing username field
  test('Missing username for new user', async () => {
    const newUser = {
      username: '',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(404)
  })

  //Test if missing password field
  test('Missing password for new user', async () => {
    const newUser = {
      username: 'test',
      password: ''
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(404)
  })
})

//GET route test
describe('GET routes for User database', () => {
  //clear current test database
  beforeEach(async () => {
    await User.deleteMany({})

    //For test purposes, create user with specific username
    const user = new User({ username: 'test2', passwordHash: 'testpw' })

    await user.save()
  })

  test('Retreive a User with a valid username', async () => {
    const username = 'test2'

    //save result of GET api call to variable
     const result = await api
      .get(`/api/users/${username}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    //check if result matches username 
    expect(result.body.username).toEqual(username)
  })

  test('Non existing/invalid username returns failed status code 404', async () => {
    const username = 'DOESNOTEXIST'

    await api
      .get(`/api/users/${username}`)
      .expect(404)
  })
})

afterAll(async ()=> {
  //clear database
  await User.deleteMany({})
  await mongoose.connection.close()
})