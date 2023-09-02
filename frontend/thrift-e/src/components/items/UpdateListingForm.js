import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemsAPI from '../../services/items'

const UpdateListingForm = ({item, setAlertMessage}) => {
  const navigate = useNavigate()
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)
  const [clothingType, setClothingType] = useState(item.clothingType)
  const [promptDelete, setPromptDelete] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState('')

  const updateListing = (e) => {
    e.preventDefault()

    if (price < 0) {
      setAlertMessage('Price invalid!')
      return
    }

    if (name && price && clothingType) {
      const newItem = {
        name,
        price,
        clothingType
      }

      ItemsAPI.updateItem(newItem, item._id)
        .then(res => {
          setAlertMessage('Item information updated successfully')
          navigate(`/user/${item.seller}`)
        })
        .catch(err => {
          setAlertMessage('Something went wrong! Could not update!')
        })
    } else {
      setAlertMessage('Something went wrong!')
      return
    }
  }

  const deleteItem = (e) => {
    e.preventDefault()
    
    if (confirmDelete === item.name) {
      ItemsAPI.deleteItem(item._id)
        .then(res => {
          setAlertMessage('Deleted item successfully.')
          navigate(`/user/${item.seller}`)
        })
        .catch(err => {
          setAlertMessage('Something went wrong!')
        })
    } else {
      setAlertMessage('Input was incorrect.')
    }
  }

  return (
    <div>
      <form onSubmit={updateListing}>
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
        <input type='submit' value='Update Item Listing'/>
      </form>
      <button onClick={()=>setPromptDelete(!promptDelete)}>Delete Listing?</button>
      { promptDelete &&
        <form onSubmit={deleteItem}>
          <h3>Type item name to delete permanently</h3>
          <input value={confirmDelete} onChange={({target}) => setConfirmDelete(target.value)} />
          <input type='submit' value='Delete Item Permanently' />
        </form>
      }
    </div>
  )

}

export default UpdateListingForm