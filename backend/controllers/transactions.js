const transactionRouter = require('express').Router()
const User = require('../models/users')
const Item = require('../models/items')
const Transaction = require('../models/transaction')

//GET route
//Return one transaction

//Return specific transaction

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
        const buyer = await User.findById(req.session.user) //Find user buying item

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

        item.isSold = true
        await item.save()

        res.status(200).json(transaction)
      } else {
        console.log('Item not found.')
        res.status(404).json({ message: 'Item not found.'})
      }
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'Error.'})
    }
  } else {
    res.status(401).json({ message: 'Not authorized.'})
  }
})

module.exports = transactionRouter