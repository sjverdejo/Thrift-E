import loginAPI from '../../services/login'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const navigate = useNavigate()
  const logOut = () => {
    loginAPI.logout()
      .then(res => {
        console.log(res)
        //Set user to null maybe
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <button onClick={logOut}>Logout</button>
  )
}

export default Logout