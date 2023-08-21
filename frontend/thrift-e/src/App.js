import { useState } from 'react'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState(null)

  const username = (user) => {
    return (<h1>{user.username}</h1>)
  }
  return (
    <>
      <Login user={user} setUser={setUser}/>
      {user && username(user)}
    </>
  )
}

export default App
