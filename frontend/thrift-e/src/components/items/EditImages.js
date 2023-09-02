import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemsAPI from '../../services/items'

const EditImages = ({item, setAlertMessage}) => {
  const navigate = useNavigate()
  const [showAdd, setShowAdd] = useState(false)
  const [imgName, setImgName] = useState('')
  const [img, setImg] = useState([])

  console.log('items', item.itemImages)
  const addNewImg = (e) => {
    e.preventDefault()

    const formData = new FormData()

    if (!img) {
      setAlertMessage('No change.')
      // setShowUpdate(false)
      return
    }

    formData.append('files', img[0])

    ItemsAPI.updateItemImage(formData, item._id)
      .then(res => {
        setAlertMessage('Added item image successfully.')
        navigate(`/user/${item.seller}`)
      })
      .catch(err => {
        setAlertMessage('Something went wrong!')
      })

      setImgName('')
      setImg([])
  }

  const handleImg = (e) => {
    if (e.target.files[0].name.includes(' ')) {
      setAlertMessage('Item name can not contain white spaces')
      setImg([])
      return
    } else {
      setImg([...img, e.target.files[0]])
      setImgName(e.target.value)
    }
  }

  return (
    <div>
      <button onClick={() => setShowAdd(!showAdd)}>Add New Image</button>
      { showAdd &&
        <form onSubmit={addNewImg} encType='multipart/form-data'>
          <input type='file' value={imgName} onChange={handleImg}/>
          <input type='submit' value='Add Image' />
        </form>
      }
    </div>
  )
}

export default EditImages