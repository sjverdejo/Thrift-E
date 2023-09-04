import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import itemsAPI from '../../services/items'

const NewListing = () => {
  const navigate = useNavigate()
  const { setAlertMessage } = useOutletContext()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [clothingType, setClothingType] = useState('Tanktop')
  const [images, setImages] = useState([])
  const [imgC, setImgC] = useState('')

  const createItem = (e) => {
    e.preventDefault()

    if (!validPrice(price)) {
      setAlertMessage('Price invalid!')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('clothingType', clothingType)
    
    if (images.length > 0) {
      for (let i in images) {
        formData.append('files', images[i])
      }
    }

    itemsAPI.postNewItem(formData)
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
  
  const imageHandler = (e) => {
    setImages([])
    setImgC('')
    for (const file of e.target.files) {
      if (file.name.includes(' ')) {
        setAlertMessage('Image file name can not contain, please try again.')
        return
      } 
    }

    setImgC(e.target.value)
    setImages(e.target.files)
  }

  return (
    <div class='bg-slate-600 p-5 rounded-xl shadow-xl h-96 mb-48'>
      <form onSubmit={createItem} encType='multipart/form-data'>
        <div class='flex flex-col text-slate-200'>
          Listing Name:<input class='rounded-md shadow-md text-slate-800 mb-5' value={name} onChange={({target}) => setName(target.value)} required/>
          Price: <input class='rounded-md shadow-md text-slate-800 mb-5' value={price} onChange={({target}) => setPrice(target.value)} required/>
          Clothing Type: 
          <select 
            class='rounded-md shadow-md text-slate-800 mb-5'
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
          <input class='file:rounded-lg mb-12' type='file' value={imgC} onChange={imageHandler} accept='image/*' multiple/>
        </div>
        <div class='text-center'>
          <input class='text-slate-200 bg-slate-800 p-2 rounded-xl shadow-xl'type='submit' value='Post Item Listing'/>
        </div>
      </form>
    </div>
  )
}

export default NewListing