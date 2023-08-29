import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginAPI from '../../services/login'

const LoginForm = ({setUser}) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
  const [newUser, setNewUser] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, password)
    const user = {
      username: username,
      password: password
    }

    if (!newUser) {
      loginAPI.login(user)
      .then(res => {
        console.log(res)
        setUser(res)
        navigate('/home')
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      if (confirmPassword(password, secondPassword) && validateUsername(username) && !hasSpaces(password)) {
        loginAPI.register(user)
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
  }

  const confirmPassword = (pass1, pass2) => {
    if (pass1 === pass2) {
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

  const rules = () => {
    return (
      <div>
        <ul>
          <li>Case-sensitive username and password</li>
          <li>No whitespaces for username or password</li>
          <li>No non alpha numberic characters for username</li>
        </ul>
      </div>
    )
  }
  return (
    <>
      <h1>{newUser ? 'Register' : 'Sign in'}</h1>
      <form onSubmit={handleSubmit}>
        Username:<input value={username} onChange={({target}) => setUsername(target.value)} required/>
        Password: <input type='password' value={password} onChange={({target}) => setPassword(target.value)} required/>
        { newUser && 
          <div>
            Confirm Password: <input type='password' value={secondPassword} onChange={({target}) => setSecondPassword(target.value)} required/>
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