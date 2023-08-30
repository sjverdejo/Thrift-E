import { useOutletContext, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/checkout/CheckoutForm'

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHKEY)

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('')
  const { item, user, setAlertMessage } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3001/api/buy/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: item.price, item: item, buyer: user.user._id }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => {
        setAlertMessage('Something went wrong.')
        navigate('/')
      })

  }, [])

  const appearance = {
    theme: 'stripe',
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div>
      {clientSecret && (
        <Elements options = {options} key={clientSecret} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default CheckoutPage