import { useNavigate } from 'react-router-dom'
import loginAPI from '../../services/login'

const Logout = ({setUser, setAlertMessage}) => {
  const navigate = useNavigate()
  const logOut = () => {
    loginAPI.logout()
      .then(res => {
        setAlertMessage('Signed out successfully.')
        setUser(null)
        navigate('/')
      })
      .catch(err => {
        setAlertMessage('Error signing out.')
      })
  }

  return (
    // <button class='bg-slate-800 hover:bg-slate-500 active:bg-slate-800 text-white p-3 w-1/6' onClick={logOut}>Logout</button>
    <button onClick={logOut}>Logout</button>
  )
}

export default Logout