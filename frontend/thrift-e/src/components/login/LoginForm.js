import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import loginAPI from '../../services/login'

const LoginForm = ({setUser}) => {
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
        setUser(res)
        navigate('/home')
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      if (confirmPassword(password, secondPassword) && validateUsername(username) && !hasSpaces(password) && checkSize(username, password)) {
        userFormData.append('file', profileImage[0])
        
        loginAPI.register(userFormData)
          .then(res => {
            console.log(res)
            setNewUser(false)
          })
        .catch(err => {
        console.log(err)
        })
      } else {
        //Update for when its not validate, msg
        console.log('NOPE')
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
    return username > 4 && password > 6
  }
  const hasSpaces = (inputGiven) => {
    return inputGiven.includes(' ')
  }

  const validateUsername = (username) => {
    return(/^[a-z0-9]+$/i).test(username)
  }

  const imageChange = (e) => {
    setProfilePicture(e.target.value)
    setProfileImage([...profileImage, e.target.files[0]])
  }

  const rules = () => {
    return (
      <div>
        <ul>
          <li>Case-sensitive username and password</li>
          <li>No whitespaces for username or password</li>
          <li>No non alpha numberic characters for username</li>
          <li>Username must be 4 characters long</li>
          <li>Password must be 6 characters long</li>
          {/*Add rules for images*/}
        </ul>
      </div>
    )
  }

  return (
    <>
      <h1>{newUser ? 'Register' : 'Sign in'}</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        Username:<input value={username} onChange={({target}) => setUsername(target.value)} required/>
        Password: <input type='password' value={password} onChange={({target}) => setPassword(target.value)} required/>
        { newUser && 
          <div>
            Confirm Password: <input type='password' value={secondPassword} onChange={({target}) => setSecondPassword(target.value)} required/>
            Profile Picture: <input type='file' value={profilePicture} onChange={imageChange}/>
          </div>
        }
        <input type='submit' value={ newUser ? 'Register' : 'Sign in'}/>
      </form>
      <button onClick={() => setNewUser(!newUser)}>{newUser ? 'Already have a profile? Click here.' : 'Not Registered Click here.' }</button>
      {newUser && rules()}
    </>
  )
}

export default LoginForm