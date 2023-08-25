import { useState, useEffect } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  
  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          console.log('Succeed')
          console.log(paymentIntent)
          setMessage('Payment success')
          break
        case 'processing':
          console.log('processing')
          setMessage('Payment processing')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          console.log('Succeed')
          setMessage('Something went wrong')
          break
      }
    })
  })

  const paymentElementOptions = {
    layout: 'tabs'
  }

  const submitPayment = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/',
      }
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('Unexpected error occured')
    }
  }
  return (
    <form id='payment-form' onSubmit={submitPayment}>
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <button type='submit'>Pay</button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}

export default CheckoutForm