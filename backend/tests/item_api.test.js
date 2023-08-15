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

  test('Adding a new item with valid info', async () => {
    const items = await Item.find({}) //All items currently in database
    const user = await User.findOne({}) //Retreive user
    const userId = user._id

    const newItem = {
      name: 'Red Shirt',
      price: '50',
      clothingType: 'Shirt',
      seller: userId
    }

    await api
      .post('/api/items')
      .send(newItem)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    //Get all users updated and compare to original count
    const newItems = await Item.find({})
    expect(newItems).toHaveLength(items.length + 1)
    
    //create array of all item names and check if new item is added
    const itemNames = newItems.map(i => i.name)
    expect(itemNames).toContain(newItem.name)
  })

  test('Test missing name when creating', async () => {
    const user = await User.findOne({}) //Retreive user
    const userId = user._id

    const newItem = {
      price: '50',
      clothingType: 'Shirt',
      seller: userId
    }

    await api
      .post('/api/items')
      .send(newItem)
      .expect(404)
  })

  test('Test missing price when creating', async () => {
    const user = await User.findOne({}) //Retreive user
    const userId = user._id

    const newItem = {
      name: 'Red Shirt',
      clothingType: 'Shirt',
      seller: userId
    }

    await api
      .post('/api/items')
      .send(newItem)
      .expect(404)
  })

  test('Test missing clothingType when creating', async () => {
    const user = await User.findOne({}) //Retreive user
    const userId = user._id

    const newItem = {
      name: 'Red Shirt',
      price: '50',
      seller: userId
    }

    await api
      .post('/api/items')
      .send(newItem)
      .expect(404)
  }) 

  test('Test missing seller when creating', async () => {
    const newItem = {
      name: 'Red Shirt',
      price: '50',
      clothingType: 'Shirt'
    }

    await api
      .post('/api/items')
      .send(newItem)
      .expect(404)
  }) 
})

describe('PUT Route for Items', () => {
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

  test('Updating an Item with a valid User ID', async () => {
    const items = await Item.find({}) //retrieve all items
    const item = await Item.findOne({}) //retrieve first item in database
    const itemId = item._id

    const changes = {
      name: 'Red Sweater',
      price: '30',
      clothingType: 'Sweater'
    }

    await api
      .put(`/api/items/${itemId}`)
      .send(changes)
      .expect(200)

    //Compare count of all items to ensure same amount and no new items created
    //Check if first item updated correctly
    const updatedItems = await Item.find({}) //retrieve all items again
    const updatedItem = await Item.findOne({}) //retrieve first item again
    expect(updatedItems).toHaveLength(items.length)
    expect(updatedItem.name).toContain(changes.name)
  })

  test('Attempting to update an Item with an invalid User ID', async () => {
    const invalidId = 'INVALID'

    const changes = {
      name: 'Red Sweater',
      price: '30',
      clothingType: 'Sweater'
    }

    await api
      .put(`/api/items/${invalidId}`)
      .send(changes)
      .expect(404)
  })

  test('Updating an Item with a missing name', async () => {
    const item = await Item.findOne({}) //retrieve first item in database
    const itemId = item._id

    const changes = {
      name: '',
      price: '30',
      clothingType: 'Sweater'
    }

    await api
      .put(`/api/items/${itemId}`)
      .send(changes)
      .expect(404)
    
    const checkItem = await Item.findOne({}) //retrieve item to be updated to ensure not changed
    expect(checkItem.name).toContain(item.name) //check if change
  })

  test('Updating an Item with a missing price', async () => {
    const item = await Item.findOne({}) //retrieve first item in database
    const itemId = item._id

    const changes = {
      name: 'Red Sweater',
      price: '',
      clothingType: 'Sweater'
    }

    await api
      .put(`/api/items/${itemId}`)
      .send(changes)
      .expect(404)
    
    const checkItem = await Item.findOne({}) //retrieve item to be updated to ensure not changed
    expect(checkItem.price).toContain(item.price) //check change
  })

  test('Updating an Item with a missing clothing type', async () => {
    const item = await Item.findOne({}) //retrieve first item in database
    const itemId = item._id

    const changes = {
      name: 'Red Sweater',
      price: '30',
      clothingType: ''
    }

    await api
      .put(`/api/items/${itemId}`)
      .send(changes)
      .expect(404)
    
    const checkItem = await Item.findOne({}) //retrieve item to be updated to ensure not changed
    expect(checkItem.clothingType).toContain(item.clothingType) //check if changed
  })
})

describe('DELETE Route for Items', () => {
  
})


afterAll(async () => {
  await mongoose.connection.close()
})
