import { useEffect } from 'react'
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

  const { item, setAlertMessage } = useOutletContext()

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
          setAlertMessage('Payment Successful!')
          navigate('/home')
          break
        case 'processing':
          setAlertMessage('Payment processing')
          break
        default:
          setAlertMessage('Something went wrong.')
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
      setAlertMessage('Something went wrong! Try again later!')
    } else {
      setAlertMessage('Unexpected Error!')
    }
  }

  const cancelPayment = () => {
    navigate('/listings')
  }

  return (
    <form id='payment-form' onSubmit={submitPayment}>
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <button type='submit'>Pay</button>
      <button onClick={cancelPayment}>Cancel</button>
    </form>
  )
}

export default CheckoutForm