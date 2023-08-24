import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginAPI from '../../services/login'

const LoginForm = ({setUser}) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      loginAPI.register(user)
      .then(res => {
        console.log(res)
        setNewUser(false)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  return (
    <>
      <h1>{newUser ? 'Register' : 'Sign in'}</h1>
      <form onSubmit={handleSubmit}>
        Username:<input value={username} onChange={({target}) => setUsername(target.value)}/>
        Password: <input value={password} onChange={({target}) => setPassword(target.value)}/>
        {/* 
          Add image upload for register
          add second password to match first 
          Add guidelines 
        */}
        <input type='submit' value='submit'/>
      </form>
      <button onClick={() => setNewUser(!newUser)}>{newUser ? 'Already have a profile? Click here.' : 'Not Registered Click here.' }</button>
    </>
  )
}

export default LoginForm