import { useState } from 'react'
import itemsAPI from '../../services/items'

const NewListing = () => {
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
      .catch(err => {
        console.log(err)
      })
  }
  
  return (
    <form onSubmit={createItem}>
      <input value={name} onChange={({target}) => setName(target.value)}/>
      <input value={price} onChange={({target}) => setPrice(target.value)}/>
      <input value={clothingType} onChange={({target}) => setClothingType(target.value)}/>
      {/**Add images */}
      <input type='submit' value='Post Item Listing'/>
    </form>
  )
}

export default NewListing