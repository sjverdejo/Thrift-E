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
  const [message, setMessage] = useState('Test')
  const [showAlert, setShowAlert] = useState(true)

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
    <div class='h-screen bg-slate-800'>
      <Navbar user={user}/>
      {showAlert && <AlertMessage message={message} setMessage={setMessage} setShowAlert={setShowAlert} /> }
      {!user && <LandingPage setUser={setUser} setAlertMessage={setAlertMessage}/>}
      {user && <Outlet context={{user, setUser, allItems, setItems, setAlertMessage}}/>}
      {user && <Logout setUser={setUser} setAlertMessage={setAlertMessage} />}
    </div>
  )
}

export default App
