const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Item = require('../models/items')
const User = require('../models/users')

describe('GET Routes for Items', () => {
  beforeEach(async () => {
    //delete ALL User database and Item database 
    await User.deleteMany()
    await Item.deleteMany()

    //Create a user for testing
    const testUser = new User({
      username: 'Test',
      passwordHash: 'TestPW',
    })

    const user = await testUser.save()
    const userId = user._id

    const currentDate = new Date()

    const testItem = new Item({
      name: 'Green Shirt',
      datePosted: currentDate,
      price: '40',
      clothingType: 'Shirt',
      seller: userId
    })

    const testItem2 = new Item({
      name: 'Blue Shirt',
      datePosted: currentDate,
      price: '20',
      clothingType: 'Shirt',
      seller: userId
    })

    await testItem.save()
    await testItem2.save()
  })

  test('GET all items', async () => {
    const items = await api
      .get('/api/items')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    //Database should have 2 items
    expect(items.body).toHaveLength(2)
  })

  test('GET one item', async () => {
    const item = await Item.findOne({}) //Retrieve first item in database
    const id = item._id

    const result = await api
      .get(`/api/items/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.name).toEqual('Green Shirt') //result should be first item in database
  })

  test('Attempt getting item with invalid ID', async () => {
    const id = '43242432432432'

    await api
      .get(`/api/items/${id}`)
      .expect(404)
  })
})

describe('POST Route for Items', () => {

})

describe('PUT Route for Items', () => {

})

describe('DELETE Route for Items', () => {
  
})


afterAll(async () => {
  await mongoose.connection.close()
})
