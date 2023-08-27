import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import itemAPI from './services/items'
import loginAPI from './services/login'
import Logout from './components/login/Logout'

const App = () => {
  const [user, setUser] = useState(null)
  const [allItems, setItems] = useState([])
  const [message, setMessage] = useState('Here')
  useEffect(() => {
    loginAPI
      .checkLoggedIn()
      .then(res => {
        if (res.loggedIn) {
          console.log(res.user)
          setUser(res.user)
        } else {
          console.log(res.message)
          setUser(null)
        }
      })
  },[])

  useEffect(() => {
    itemAPI.getAllItems()
      .then(res => {
        setItems(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [user])

  return (
    <>
      Nav Bar
      {!user && <LandingPage setUser={setUser}/>} 
      {user && <Link to='/listings'>All Items</Link>}
      {user && <Link to='/create'>Create new</Link>}
      {user && <Outlet context={{user, setUser, allItems, setItems, setMessage}}/>}
      <h4>{message}</h4>
      {user && <Logout setUser={setUser}/> }
      <Link to='/home'>Home</Link>
    </>
  )
}

export default App
