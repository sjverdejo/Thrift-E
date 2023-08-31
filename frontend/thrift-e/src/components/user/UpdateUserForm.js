import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UsersAPI from '../../services/users'

const UpdateUserForm = ({profile, setShowUpdate, setAlertMessage}) => {
  const navigate = useNavigate()
  const [image, setImage] = useState([])
  const [filename, setFilename] = useState('')

  const updateHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()

    if (!image) {
      setAlertMessage('No change.')
      setShowUpdate(false)
      return
    }

    formData.append('file', image[0])

    UsersAPI.updateUser(profile._id, formData)
      .then(res => {
        setAlertMessage('Updated successfully.')
        setShowUpdate(false)
        navigate('/')
      })
      .catch(err => {
        setAlertMessage('Something went wrong!')
      })

    setImage([])
    setFilename('')
  }

  const deleteHandler = () => {
    if (profile.profilePicture) {
      UsersAPI.deleteUser(profile._id)
        .then(res => {
          setAlertMessage('Image Removed.')
          navigate('/')
        })
        .catch(err => {
          setAlertMessage('Something went wrong!')
        })
    } else {
      setAlertMessage('No Image to Delete.')
    }
  }

  const imageChange = (e) => {
    if (e.target.files[0].name.includes(' ')) {
      setAlertMessage('Image file name contains whitespace!')
      return
    } else {
      setFilename(e.target.value)
      setImage([...image, e.target.files[0]])
    }
  }

  return (
    <div>
      <form onSubmit={updateHandler} encType='multipart/form-data'>
        <input type='file' value={filename} onChange={imageChange} accepts='image/*'/>
        <button type='submit'>Update</button>
      </form>
      <button onClick={deleteHandler}>Delete Image</button>
    </div>
  )
}

export default UpdateUserForm