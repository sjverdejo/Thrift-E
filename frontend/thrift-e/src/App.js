import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import itemAPI from './services/items'
import loginAPI from './services/login'

const App = () => {

  const [user, setUser] = useState(null)
  const [allItems, setItems] = useState([])

  useEffect(() => {
    loginAPI
      .checkLoggedIn()
      .then(res => {
        if (res.loggedIn) {
          console.log(res.user)
          setUser(res.user)
        } else {
          console.log(res.message)
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
      {user && <Outlet context={{user, setUser, allItems, setItems}}/>}
      <Link to='/home'>Home</Link>
    </>
  )
}

export default App
