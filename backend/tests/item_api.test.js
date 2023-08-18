const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/users')
const Item = require('../models/items')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

let cookie = null //create global cookie variable

//Before each test set the database and cookie
beforeEach( async ()=> {
  await User.deleteMany()
  await Item.deleteMany()

    const saltRounds = 10
    const pw = 'TestPW'
    const passwordHash = await bcrypt.hash(pw, saltRounds)
    //Create a user for testing
    const testUser = new User({
      username: 'Test',
      passwordHash: passwordHash,
      dateCreated: new Date()
    })

    const user = await testUser.save()
    const userId = user._id

    const currentDate = new Date()

    const testItem = new Item({
      name: 'Green Shirt',
      datePosted: currentDate,
      price: '40',
      clothingType: 'Shirt',
      seller: userId,
      isSold: false
    })

    const testItem2 = new Item({
      name: 'Blue Shirt',
      datePosted: currentDate,
      price: '20',
      clothingType: 'Shirt',
      seller: userId,
      isSold: false
    })

    await testItem.save()
    await testItem2.save()

    
    const result = await api.post('/api/login')
    .send({ username: 'Test', password: 'TestPW' })
    .expect(200)
  
    cookie = result.header['set-cookie']
})

//GET Routes
describe('GET route tests...', () => {
  test('GET route declined without authentication', async () => {
    const res = await api
    .get('/api/items')
    .expect(401)
  })

  test('GET all items successfully', async () => {
    const res = await api
      .get('/api/items')
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(res.body).toHaveLength(2) //Should have 2 items returned
  })

  test('GET one specific item successfully', async () => {
    const itemToRetrieve = await Item.findOne({}) //For comparison after API call

    const res = await api
      .get(`/api/items/${itemToRetrieve._id}`)
      .set('Cookie', cookie)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(res.body.name).toEqual('Green Shirt') //result should be first item in database
  })

  test('GET one item with an invalid ID', async () => {
    await api
      .get('/api/items/INVALIDID')
      .set('Cookie', cookie)
      .expect(404)
  })
})

//POST Routes
describe('POST route tests...', () => {
  test('Attempt to create an item without authentication', async () => {

  })

  test('Create an item with valid fields and authentication', async () => {

  })

  test('Missing name when creating', async () => {

  })

  test('Missing price when creating', async () => {

  })

  test('Missing clothingType when creating', async () => {

  })

  test('Non-number price when creating', async () => {

  })
  
})

describe('PUT route tests...', () => {

})

describe('DELETE route tests...', () => {
  
})

afterAll(async () => {
  await User.deleteMany()
  await Item.deleteMany()
  await mongoose.connection.close()
})