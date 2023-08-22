const itemsRouter = require('express').Router()
const User = require('../models/users')
const Item = require('../models/items')

//GET routes
//GET all items if authenticated
itemsRouter.get('/', async (req, res) => {
  //Check if session is authenticated
  if (req.session.authenticated) {
    const items = await Item.find({})
    console.log('Get all items.')
    res.json(items) //respond with all items in database
  } else {
    res.status(401).json({ message: 'Not Authenticated.' }) //not logged in
  }
})

//GET individual item if authenticated
itemsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  if (req.session.authenticated) {
    try {
      const item = await Item.findById(id)
      console.log('Successfully retrieved one item.')
      res.json(item)
    } catch (error) {
      console.log('Item not found.')
      res.status(404).json({ message: 'Not found.' })
    } 
  } else {
    res.status(401).json({ message: 'Not Authenticated.' })
  }
})

//POST routes
//Creating a new item if authenticated with seller set to authenticated user
itemsRouter.post('/', async (req, res) => {
  const { name, price, clothingType } = req.body
  const datePosted = new Date()

  if (req.session.authenticated) {
    const seller = req.session.user._id //set seller to authenticated user
  
    const user = await User.findById(seller)
    //create new item to send
    const item = new Item({
      name,
      datePosted,
      price,
      clothingType,
      seller,
      isSold: false //set isSold to false since new item
    })
  
    //if creation successful, save to database otherwise send 404 error
    try {
      const newItem = await item.save()
      user.items = user.items.concat(newItem._id) //add item to users array of items
      await user.save() //save user database with update
      res.status(201).send(newItem)
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'Error Adding.' })
    }
  } else {
    res.status(401).json({ message: 'Not Authenticated.' })
  }
})

//PUT route
//Updating item if user authenticated matches seller and item not sold
itemsRouter.put('/:id', async (req, res) => {
  //only change these 3 fields
  const { name, price, clothingType } = req.body
  const id = req.params.id

  if (req.session.authenticated) {
    if (name && price && clothingType) {
      try {
        const item = await Item.findById(id)
        if ((item.seller.toString() === req.session.user._id) && !item.sold) { //if seller is authenticated user and item is not sold yet
          const updated = await Item.findByIdAndUpdate(id, { name, price, clothingType }, { new: true })
          res.status(200).json(updated)
          console.log(item.seller, 'Updated successfully.')
        } else {
          console.log('Failed to update.')
          res.status(404).json({ message: 'Failed to update.' })
        }
      } catch(error) {
        console.log('Failed to update.')
        res.status(404).json({ message: 'Failed to update.' })
      }
    } else {
      console.log('Failed to update missing name or price or clothingType.')
        res.status(404).json({ message: 'Failed to update.' })
    }
  } else {
    res.status(401).json({ message: 'Not Authenticated.' })
  }
})

//DELETE route
//Delete item only if seller owns it, authenticated, not sold \\ sold and authenticated
itemsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  //if unable to delete, 404 status. Otherwise delete item by Id from database
  if (req.session.authenticated) {
    try {
      const itemToDelete = await Item.findByIdAndDelete(id)
      if ((itemToDelete && (itemToDelete.seller.toString() === req.session.user._id) && !itemToDelete.sold)) { //check if item exists, matches seller and is not sold
        //ADD extra if condition the user is buyer + sold
        res.status(200).send(itemToDelete)
        console.log('Deleted Successfully.')
      } else {
        console.log('Unsuccessful deletion.')
        res.status(404).json({ message: 'Delete unsuccessful.' })
      }
    } catch {
      console.log('Not found')
      res.status(404).json({ message: 'Not Found.' })
    }
  } else {
    res.status(401).json({ message: 'Not Authenticated.' })
  }
})

module.exports = itemsRouter
