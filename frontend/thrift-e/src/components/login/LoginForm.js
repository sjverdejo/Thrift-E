import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginAPI from '../../services/login'

const LoginForm = ({setUser, setAlertMessage}) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState('') 
  const [newUser, setNewUser] = useState(false)
  const [profileImage, setProfileImage] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const userFormData = new FormData()
    userFormData.append('username', username)
    userFormData.append('password', password)
    

    if (!newUser) {
      loginAPI.login(userFormData)
      .then(res => {
        console.log(res)
        setAlertMessage('Successfully signed in!')
        setUser(res)
        navigate('/')
      })
      .catch(err => {
        setAlertMessage('Error signing in!')
      })
    } else {
      if (confirmPassword(password, secondPassword) && validateUsername(username) && !hasSpaces(password) && !checkSize(username, password)) {
        
        if (profileImage) {
          userFormData.append('file', profileImage[0])
        }
        
        loginAPI.register(userFormData)
          .then(res => {
            setNewUser(false)
            setAlertMessage('Account created successfully!')
          })
          .catch(err => {
            setAlertMessage('Something went wrong! Try again later.')
          })
      } else {
        setAlertMessage('Username and Password does not follow rules.')
      }
    }

    setUsername('')
    setPassword('')
    setSecondPassword('')
    setProfilePicture('')
    setProfileImage([])
  }

  const confirmPassword = (pass1, pass2) => {
    if (pass1 === pass2) {
      return true
    } else {
      return false
    }
  }

  const checkSize = (username, password) => {
    if (username < 4 || password < 6) {
      return true
    } else {
      return false
    }
  }
  const hasSpaces = (inputGiven) => {
    return inputGiven.includes(' ')
  }

  const validateUsername = (username) => {
    return(/^[a-z0-9]+$/i).test(username)
  }

  const imageChange = (e) => {
    if (hasSpaces(e.target.files[0].name)) {
      setAlertMessage('Image name can not contain spaces')
      return
    } else {
      setProfilePicture(e.target.value)
      setProfileImage([...profileImage, e.target.files[0]])
    }
  }

  const rules = () => {
    return (
      <div class='flex justify-center text-white'>
        <ul class='list-disc'>
          <li>Case-sensitive username and password</li>
          <li>No whitespaces for username or password</li>
          <li>No non-alphanumeric characters for username</li>
          <li>Username must be 4 characters long</li>
          <li>Password must be 6 characters long</li>
          <li>Image name can not contain white spaces</li>
        </ul>
      </div>
    )
  }

  return (
    <div class='w-1/2 p-10 border flex flex-col rounded-xl shadow-xl bg-slate-800'>
      <h1 class='pb-10 text-3xl text-center text-white'>{newUser ? 'Register' : 'Sign in'}</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div class='flex flex-col items-center space-y-5'>
          <div class='w-3/5'>
            <label class='block text-xs text-slate-200'>Username: </label> <input class='rounded-md shadow-xl w-full' value={username} onChange={({target}) => setUsername(target.value)} required/>
          </div>
          <div class='w-3/5'>
            <label class='block text-xs text-slate-200'>Password</label> <input className='rounded-md shadow-xl w-full' type='password' value={password} onChange={({target}) => setPassword(target.value)} required/>
          </div>
          { newUser && 
            <div class='w-full flex flex-col items-center space-y-5'>
              <div class='w-3/5'>
                <label class='block text-xs text-slate-200'>Confirm Password: </label> <input class='rounded-md shadow-xl w-full' type='password' value={secondPassword} onChange={({target}) => setSecondPassword(target.value)} required/>
              </div>
              <div class='w-3/5'>
                <label class='block text-xs text-slate-200'>Profile Picture: </label><input class='file:rounded-md text-white ' type='file' value={profilePicture} onChange={imageChange} accept='image/*'/>
              </div>
            </div>
          }
          <input class='m-4 bg-red-600 text-white w-40 rounded-lg shadow-xl hover:bg-red-200 active:bg-red-600 p-2 text-white w-3/5' type='submit' value={ newUser ? 'Register' : 'Sign in'}/>
        </div>
      </form>
      
      <button class='text-xs text-slate-400 active:text-slate-600 p-5' onClick={() => setNewUser(!newUser)}>{newUser ? 'Already have a profile? Click here.' : 'Not Registered Click here.' }</button>
      {newUser && rules()}
    </div>
  )
}

export default LoginForm