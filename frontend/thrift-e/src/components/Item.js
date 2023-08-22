import { useState } from 'react'
import usersAPI from '../services/users'
const Item = ({item}) => {
  const [seller, setSeller] = useState(null)
  
  usersAPI
    .getUser(item.seller)
    .then(res => {
      setSeller(res.username)
    })
    .catch(err => {
      console.log(err.response.data.message)
    })

  return (
    <>
      <h1>Name:{item.name}</h1>
      <h3>Price: ${item.price}</h3>
      <h3>Date Posted:{item.datePosted}</h3>
      <h2>Seller:{seller}</h2>
    </>
  )
}

export default Item