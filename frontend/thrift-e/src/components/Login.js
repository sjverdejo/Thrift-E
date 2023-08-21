import { useState } from 'react'

const Login = ({user, setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = (e) => {
    e.preventDefault()
    console.log('here')
    console.log(username, password)
    const newUser = {
      username: username,
      password: password
    }
    setUser(newUser)
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