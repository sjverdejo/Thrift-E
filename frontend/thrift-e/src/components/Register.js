import { useState } from 'react'
import usersAPI from '../services/users'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitRegister = (e) => {
    e.preventDefault()
    const newUser = {
      username: username,
      password: password
    }

    usersAPI.register(newUser)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <>
      <form onSubmit={submitRegister}>
        Username:<input value={username} onChange={({target}) => setUsername(target.value)}/>
        Password: <input value={password} onChange={({target}) => setPassword(target.value)}/>
        <input type='submit' value='Register'/>
      </form>
    </>
  )
}

export default Register