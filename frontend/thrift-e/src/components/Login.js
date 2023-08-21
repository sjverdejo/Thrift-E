import { useState } from 'react'
import usersAPI from '../services/users'

const Login = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = (e) => {
    e.preventDefault()
    console.log(username, password)
    const newUser = {
      username: username,
      password: password
    }

    usersAPI.login(newUser)
      .then(res => {
        console.log(res)
        setUser(res)
      })
      .catch(err => {
        console.log(err.response.data)
      })

  }
  return (
    <>
      <form onSubmit={submitLogin}>
        Username:<input value={username} onChange={({target}) => setUsername(target.value)}/>
        Password: <input value={password} onChange={({target}) => setPassword(target.value)}/>
        <input type='submit' value='submit'/>
      </form>
    </>
  )
}

export default Login