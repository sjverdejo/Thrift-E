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
    console.log(img)
    if (img.length === 0) {
      setAlertMessage('No change.')
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
  }

  const deleteImg = (e) => {
    e.preventDefault()
    if (confirmDelete === 'delete') {
      const imageName = selectImg.split('/')
      let imgToBeDeleted = null

      for (const i of item.itemImages) {
        if (i.includes(imageName[imageName.length - 1])) {
          imgToBeDeleted = imageName[imageName.length - 1]
          break
        }
      } 
      
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
    <div class='flex flex-col justify-center items-center'>
      <div class='flex space-x-32'>
        <button class='text-slate-900 font-bold' onClick={() => {setShowAdd(!showAdd); setShowDelete(false)}}>Add New Image</button>
        <button class='text-slate-900 font-bold' onClick={() => {setShowAdd(false); setShowDelete(!showDelete)}}>Delete Image</button>
      </div>
      { showAdd &&
        <form onSubmit={addNewImg} encType='multipart/form-data'>
          <input class='file:bg-slate-800 file:p-2 file:rounded-xl file:shadow-x file:text-slate-200' type='file' value={imgName} onChange={handleImg} accepts='image/*'/>
          <input class='text-slate-200 bg-slate-800 p-2 rounded-xl shadow-xl'type='submit' value='Add Image' />
        </form>
      }
      { showDelete &&
      <div class='flex items-center justify-center'>
        <form onSubmit={deleteImg}>
        <div class='flex flex-col items-center justify-center'>
          <div class='flex flex-row'>
            {item.itemImages.map(i => <button class='active:outline'><img key={i} src={process.env.REACT_APP_S3 + i} width={50} onClick={selectingImg} alt='img to delete'/></button>)}
          </div>
          <h3>Select an image and type delete to delete to remove image permanently.</h3>
          <input value={confirmDelete} onChange={({target})=> setConfirmDelete(target.value)}/>
          <input class='m-2 text-slate-200 bg-slate-800 p-2 rounded-xl shadow-xl' type='submit' value='Delete Image' />
          </div>
        </form>
      </div>
      }
      <h4>To delete, first select image you would like to remove then click Delete Main Image button.</h4>
    </div>
  )
}

export default EditImages