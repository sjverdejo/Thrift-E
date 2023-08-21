import { useState } from 'react'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState(null)
  
  return (
    <>
      <Login />
    </>
  )
}

export default App
