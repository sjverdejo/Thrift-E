const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  transactions: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    datePurchased: Date
  }]
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction

