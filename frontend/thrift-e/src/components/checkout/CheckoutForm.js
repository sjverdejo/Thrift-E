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
      <div class='flex justify-between'>
        <button class='bg-slate-200 hover:bg-slate-600 active:bg-slate-200 p-3 w-24 rounded-xl shadow-xl text-slate-800 mt-3 ' type='submit'>Pay</button>
        <button class='text-slate-400' onClick={cancelPayment}>Cancel</button>
      </div>
    </form>
  )
}

export default CheckoutForm