import { useState } from 'react'
import usersAPI from '../services/users'
import itemsAPI from '../services/items'

const Item = ({item}) => {
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)
  const [clothingType, setClothingType] = useState(item.clothingType)
  const [seller, setSeller] = useState(null)
  
  usersAPI
    .getUser(item.seller)
    .then(res => {
      setSeller(res.username)
    })
    .catch(err => {
      console.log(err.response.data.message)
    })

  const updateItem = () => {
    const updatedItem = {
      name: name,
      price: price,
      clothingType: clothingType
    }

    itemsAPI
      .updateItem(updatedItem, item._id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
  }

  const updateForm = () => {
    return (
      <form onSubmit={updateItem}>
      <input value={name} onChange={({target}) => setName(target.value)}/>
      <input value={price} onChange={({target}) => setPrice(target.value)}/>
      <input value={clothingType} onChange={({target}) => setClothingType(target.value)}/>
      <input type='submit' value='Update'/>
    </form>
    )
  }
  const deleteItem = () => {
    itemsAPI
      .deleteItem(item._id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
  }
  return (
    <>
      <h1>Name:{item.name}</h1>
      <h3>Price: ${item.price}</h3>
      <h3>Date Posted:{item.datePosted}</h3>
      <h2>Seller:{seller}</h2>
      <button>Update</button>
      <button onClick={deleteItem}>Delete</button>
    </>
  )
}

export default Item