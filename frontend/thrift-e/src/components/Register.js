import { useState } from 'react'
import loginAPI from '../services/login'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitRegister = (e) => {
    e.preventDefault()
    const newUser = {
      username: username,
      password: password
    }

    loginAPI.register(newUser)
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