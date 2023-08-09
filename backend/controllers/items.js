const itemsRouter = require('express').Router()
const items = require('../models/items')

itemsRouter.get('/', async (req, res) => {
  const items = await Item.find({})

  res.json(items)
})

module.exports = itemsRouter
