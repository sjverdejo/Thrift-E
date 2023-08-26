import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const { item, setMessage } = useOutletContext()

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
          setMessage('Payment Successful!')
          navigate('/home')
          break
        case 'processing':
          setMessage('Payment processing')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

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
        return_url: `http://localhost:3000/listing/${item._id}/checkout`,
      }
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      console.log('error message')
    } else {
      console.log('unexpected')
    }
  }
  return (
    <form id='payment-form' onSubmit={submitPayment}>
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <button type='submit'>Pay</button>
    </form>
  )
}

export default CheckoutForm