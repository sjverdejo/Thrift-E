import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemsAPI from '../../services/items'

const EditImages = ({item, setAlertMessage}) => {
  const navigate = useNavigate()
  const [showAdd, setShowAdd] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [imgName, setImgName] = useState('')
  const [img, setImg] = useState([])
  const [confirmDelete, setConfirmDelete] = useState('')
  const [selectImg, setSelectImg] = useState(null)
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

  const selectingImg = (e) => {
    setSelectImg(e.target.src)
    console.log(selectImg)
  }

  const deleteImg = (e) => {
    e.preventDefault()
    console.log('select', selectImg)
    if (confirmDelete === 'delete') {
      const imageName = selectImg.split('/')
      let imgToBeDeleted = null

      for (const i of item.itemImages) {
        if (i.includes(imageName[imageName.length - 1])) {
          imgToBeDeleted = imageName[imageName.length - 1]
          break
        }
      }

      console.log(imgToBeDeleted)
      
      if (imgToBeDeleted) {
        ItemsAPI.deleteItemImage(item._id, imgToBeDeleted)
        .then(res => {
          setAlertMessage('Deleted image successfully.')
          navigate(`/user/${item.seller}`)
        })
        .catch(err => {
          setAlertMessage('Something went wrong.')
        })
      }
    } else {
      setAlertMessage('Please try again.')
      return
    }
  }

  return (
    <div>
      <button onClick={() => {setShowAdd(!showAdd); setShowDelete(false)}}>Add New Image</button>
      { showAdd &&
        <form onSubmit={addNewImg} encType='multipart/form-data'>
          <input type='file' value={imgName} onChange={handleImg} accepts='image/*'/>
          <input type='submit' value='Add Image' />
        </form>
      }
      <button onClick={() => {setShowAdd(false); setShowDelete(!showDelete)}}>Delete Image</button>
      { showDelete &&
        <form onSubmit={deleteImg}>
          {item.itemImages.map(i => <img key={i} src={process.env.REACT_APP_S3 + i} width={50} onClick={selectingImg} alt='img to delete'/>)}
          
          <h3>Select an image and type delete to delete to remove image permanently.</h3>
          <input value={confirmDelete} onChange={({target})=> setConfirmDelete(target.value)}/>
          <input type='submit' value='Delete Image' />
        </form>
      }
      <h4>To delete, first select image you would like to remove then click Delete Main Image button.</h4>
    </div>
  )
}

export default EditImages