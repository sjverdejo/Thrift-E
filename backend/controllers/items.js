const itemsRouter = require('express').Router()
const Item = require('../models/items')

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
itemsRouter.post('/', async (req, res) => {
  const { name, price, clothingType, seller } = req.body
  const datePosted = new Date()

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

  //if success, update item info. If failed, send 404 status
  try {
    const updated = await Item.findByIdAndUpdate(id, { name, price, clothingType }, { new: true })
    res.status(200).json(updated)
    console.log('Updated successfully')
  } catch(error) {
    console.log('Failed to update')
    res.status(404).end()
  }
})

//DELETE route
itemsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  //if unable to delete, 404 status. Otherwise delete item by Id from database
  try {
    await Item.findByIdAndDelete(id)
    res.status(200).send()
    console.log('Deleted Successfully.')
  } catch {
    console.log('Not found')
    res.status(404).end()
  }
})

module.exports = itemsRouter
