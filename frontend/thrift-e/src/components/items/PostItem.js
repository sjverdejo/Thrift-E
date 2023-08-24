import { useState } from 'react'
import itemsAPI from '../services/items'

const PostItem = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [clothingType, setClothingType] = useState('')

  const createItem = () => {
    const newItem = {
      name: name,
      price: price,
      clothingType: clothingType
    }

    itemsAPI.postNewItem(newItem)
      .then(res => {
        console.log(res)
      })
  }
  return (
    <form onSubmit={createItem}>
      <input value={name} onChange={({target}) => setName(target.value)}/>
      <input value={price} onChange={({target}) => setPrice(target.value)}/>
      <input value={clothingType} onChange={({target}) => setClothingType(target.value)}/>
      <input type='submit' value='Post Item Listing'/>
    </form>
  )
}

export default PostItem