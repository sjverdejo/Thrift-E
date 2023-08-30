import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import itemAPI from './services/items'
import loginAPI from './services/login'
import Navbar from './components/navigation/Navbar'
import Logout from './components/login/Logout'
import AlertMessage from './components/alert/AlertMessage'

const App = () => {
  const [user, setUser] = useState(null)
  const [allItems, setItems] = useState([])
  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const setAlertMessage = (message) => {
    setMessage(message)
    setShowAlert(true)
    setTimeout(() => {
      setMessage('')
      setShowAlert(false)
    }, 5000)
  }

  useEffect(() => {
    loginAPI
      .checkLoggedIn()
      .then(res => {
        if (res.loggedIn) {
          setUser(res.user)
        } else {
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
      <Navbar user={user}/>
      {!user && <LandingPage setUser={setUser} setAlertMessage={setAlertMessage}/>}
      {user && <Outlet context={{user, setUser, allItems, setItems, setAlertMessage}}/>}
      {showAlert && <AlertMessage message={message} setMessage={setMessage} setShowAlert={setShowAlert} /> }
      {user && <Logout setUser={setUser} setAlertMessage={setAlertMessage} />}
    </>
  )
}

export default App
