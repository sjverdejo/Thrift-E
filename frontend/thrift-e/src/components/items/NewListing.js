import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import itemsAPI from '../../services/items'

const NewListing = () => {
  const navigate = useNavigate()
  const { setAlertMessage } = useOutletContext()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [clothingType, setClothingType] = useState('Tanktop')

  const createItem = (e) => {
    e.preventDefault()

    if (!validPrice(price)) {
      //update msg
      setAlertMessage('Price invalid!')
      return
    }
    //update msg
      const newItem = {
        name: name,
        price: price,
        clothingType: clothingType
      }

      itemsAPI.postNewItem(newItem)
        .then(res => {
          setAlertMessage('Listing created successfully!')
          navigate('/')
        })
        .catch(err => {
          setAlertMessage('Listing failed to be created!')
        })
  }
  
  const validPrice = (p) => {
    if (!isNaN(p) && p > 0) {
      return true
    } else {
      return false
    }
  }
  
  return (
    <form onSubmit={createItem}>
      Listing Name:<input value={name} onChange={({target}) => setName(target.value)} required/>
      Price: <input value={price} onChange={({target}) => setPrice(target.value)} required/>
      Clothing Type: 
      <select 
        value={clothingType}
        onChange={({target}) => setClothingType(target.value)}
        required>
        <option value='Tanktop'>Tanktop</option>
        <option value='Shirt'>Shirt</option>
        <option value='Sweater'>Sweater</option>
        <option value='Dress'>Dress</option>
        <option value='Pants'>Pants</option>
        <option value='Socks'>Socks</option>
        <option value='Hat'>Hat</option>
        <option value='Shoes'>Shoes</option>
        <option value='Jacket'>Jacket</option>
      </select>
      {/**Add images */}
      <input type='submit' value='Post Item Listing'/>
    </form>
  )
}

export default NewListing