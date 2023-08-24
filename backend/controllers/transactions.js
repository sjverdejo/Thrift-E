const config = require('../utils/config')
const express = require('express')
const transactionRouter = require('express').Router()
const User = require('../models/users')
const Item = require('../models/items')
const Transaction = require('../models/transaction')

const stripe = require('stripe')(config.STRIPE_SECRET_KEY)

//GET route
//Return one transaction
transactionRouter.get('/', async (req, res) => {
  if (req.session.authenticated) {
    try {
      const user = await User.findById(req.session.user._id) //Find current user
      
      res.json(user.transactions) //return current users transactions
    } catch (error) {
      console.log('Could not find user.')
      res.status(404).json({ message: 'Unable to find User.' })
    }
  } else {
    res.status(401).json({ message: 'Not authorized.' })
  }
})

//Return specific transaction
transactionRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  if (req.session.authenticated) {
    try {
      const transaction = await Transaction.findById(id)

      res.json(transaction)
    } catch (error) {
      console.log('Could not find transaction')
      res.status(404).json({ message: 'Could not find transaction.' })
    }
  } else {
    res.status(401).json({ message: 'Not authorized.'})
  }
})

transactionRouter.post('/purchase', async (req, res) => {
  const { price } = req.body

  const  paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: 'cad',
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})


//POST route
//transaction route to buy item and add to your transactions as well as user items
//and transactions
transactionRouter.post('/:id', async (req, res) => {
  const itemId = req.params.id

  if (req.session.authenticated) { //if authenticated
    try {
      const item = await Item.findById(itemId)//Find item to be purchased
      if (item) {
        const seller = await User.findById(item.seller) //Find user selling item
        const buyer = await User.findById(req.session.user._id) //Find user buying item

        //new transaction object
        const transaction = new Transaction ({
          item: item._id,
          buyer: buyer._id,
          datePurchased: new Date()
        })

        await transaction.save()

        //update seller transaction list and item list
        seller.items = seller.items.filter((i) => i._id != itemId)
        seller.transactions = seller.transactions.concat(transaction)
        await seller.save()

        //update buyer transaction list and item list
        buyer.items = buyer.items.concat(item._id)
        buyer.transactions = buyer.transactions.concat(transaction)
        await buyer.save()

        item.isSold = true //set item to sold
        await item.save()

        res.status(200).json(transaction)
      } else {
        console.log('Item not found.')
        res.status(404).json({ message: 'Item not found.' })
      }
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'Error.' })
    }
  } else {
    res.status(401).json({ message: 'Not authorized.' })
  }
})

module.exports = transactionRouter