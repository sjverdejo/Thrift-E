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
    <button onClick={logOut}>Logout</button>
  )
}

export default Logout