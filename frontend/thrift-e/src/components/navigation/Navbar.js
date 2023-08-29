import { Link } from 'react-router-dom'
import Logout from '../login/Logout'
const Navbar = ({user}) => {
  if (user) {
    return (
      <div>
        <ul>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/listings'>All Listings</Link></li>
          <li><Link to={`user/${user.user._id}`}>My Profile</Link></li>
          <li><Link to='/create'>Sell</Link></li>
          <li><Logout /></li>
        </ul>
    </div>
    )
  } else {
    return (
      <div>
        <ul>
          <li><Link to='/login'>Sign In/Register</Link></li>
        </ul>
      </div>
    )
  }
  
}

export default Navbar