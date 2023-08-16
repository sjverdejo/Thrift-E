const itemsRouter = require('express').Router()
const Item = require('../models/items')
const User = require('../models/users')

//GET routes
itemsRouter.get('/', async (req, res) => {
  const items = await Item.find({})

  console.log('Get all items.')
  res.json(items)
})

//GET individual item
itemsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const item = await Item.findById(id)
    console.log('Successfully retrieved one item')
    res.json(item)
  } catch (error) {
    console.log('Item not found.')
    res.status(404).end()
  }
})

//POST routes
//CREATE COMMENTS FOR THIS ONE
itemsRouter.post('/', async (req, res) => {
  const { name, price, clothingType } = req.body
  const datePosted = new Date()

  const seller = req.session.user
  
  const user = await User.findById(seller)

  console.log('Seller', user)
  //seller temporary
  //create new item to send
  const item = new Item({
    name,
    datePosted,
    price,
    clothingType,
    seller
  })

  //if creation successful, save to database otherwise send 404 error
  try {
    const newItem = await item.save()
    user.items = user.items.concat(newItem._id)
    await user.save()
    console.log('Items:', user.items)
    res.status(201).send(newItem)
    console.log('Completed new item')
    //concat item to user items array
  } catch (error) {
    console.log('Error adding new item.')
    res.status(404).end()
  }
})

//PUT route
itemsRouter.put('/:id', async (req, res) => {
  //only change these 3 fields
  const { name, price, clothingType } = req.body
  const id = req.params.id

  if (name && price && clothingType) {
    try {
      const updated = await Item.findByIdAndUpdate(id, { name, price, clothingType }, { new: true })
      res.status(200).json(updated)
      console.log('Updated successfully')
    } catch(error) {
      console.log('Failed to update')
      res.status(404).end()
    }
  } else {
    console.log('Failed to update missing name or price or clothingType')
      res.status(404).end()
  }
  //if success, update item info. If failed, send 404 status
})

//DELETE route
itemsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  //if unable to delete, 404 status. Otherwise delete item by Id from database
  try {
    const itemToDelete = await Item.findByIdAndDelete(id)
    if (itemToDelete) {
      res.status(200).send()
      console.log('Deleted Successfully.')
    } else {
      console.log('No object to be deleted.npm')
      res.status(404).end()
    }
  } catch {
    console.log('Not found')
    res.status(404).end()
  }
})

module.exports = itemsRouter
