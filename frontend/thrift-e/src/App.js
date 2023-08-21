import { useState, useEffect } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Items from './components/Items'
import itemAPI from './services/items'
import loginAPI from './services/users'

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
        console.log(err.response.data.message)
      })
  }, [user])
  
  const username = ({user}) => {
    return (<h1>Hello {user.username}</h1>)
  }

  const registerForm = () => {
    return <Register />
  }
  const loginForm = () => {
    console.log('entered login')
    return <Login setUser={setUser}/>
  }
  
  const test = () => {
    console.log(user)
  }
  const Test = () => {
    return (<button onClick={test}>Test</button>)
    // console.log(user)
  }

  return (
    <>
      {!user && registerForm()}
      {!user && loginForm()}
      {user && username(user)}
      <Test />
      <h1>Items:</h1>
      <br/>
      <Items items={allItems} />
    </>
  )
}

export default App
