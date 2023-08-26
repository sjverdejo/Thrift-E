const config = require('./utils/config')
const express = require('express')
const session = require('express-session')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const usersRouter = require('./controllers/users')
const itemsRouter = require('./controllers/items')
const transactionRouter = require('./controllers/transactions')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected.')
  })
  .catch((error) => {
    console.log(`Error: ${error}`)
  })

app.use(express.json())
app.use(fileUpload())
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true
}))
// app.use(cors())

app.use(
  session({
    secret: config.SECRET,
    cookie: { maxAge : (24 * 60 * 60 * 1000) },
    saveUninitialized: false,
    resave: false
  })
)

app.use('/api/users', usersRouter)
app.use('/api/items', itemsRouter)
app.use('/api/login', loginRouter)
app.use('/api/buy', transactionRouter)
app.use('/api/logout', logoutRouter)

app.post('/webhook', express.json({type: 'application/json'}), async (request, response) => {
  const event = request.body;
  console.log('in webhook')

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      console.log('event data', event.data.object.metadata)
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

module.exports = app